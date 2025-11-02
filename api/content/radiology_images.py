import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

def download_images(url, folder_name):
    """
    Downloads all images from a given URL into a specified folder, creating the 
    folder if it does not exist.
    """
    
    # --- 1. Create the folder if it doesn't exist ---
    if not os.path.exists(folder_name):
        try:
            # os.makedirs() handles creating the directory (and any necessary parent dirs)
            os.makedirs(folder_name)
            print(f"Directory '{folder_name}' created.")
        except OSError as e:
            print(f"Error creating directory {folder_name}: {e}")
            return
    else:
        print(f"Directory '{folder_name}' already exists. Adding files to it.")
        
    # [Rest of the script is identical, focusing on fetching and parsing]

    # --- 2. Fetch the webpage content ---
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status() 
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        return

    # --- 3. Parse the HTML ---
    soup = BeautifulSoup(response.text, 'html.parser')

    # --- 4. Find all image tags (<img>) ---
    img_tags = soup.find_all('img')
    print(f"Found {len(img_tags)} image tags.")

    downloaded_count = 0
    skipped_count = 0

    for img in img_tags:
        img_url = None
        
        # Check for standard and lazy-loading attributes
        img_url = img.get('data-src') or img.get('data-lazy-src') or img.get('src')
        
        if not img_url or img_url.startswith('data:image/'):
            skipped_count += 1
            continue

        # --- 5. Make relative URLs absolute ---
        img_url = urljoin(url, img_url)

        # --- 6. Determine the filename ---
        try:
            img_name = os.path.basename(urlparse(img_url).path)
            
            if not img_name or len(img_name) < 4:
                img_name = f"image_{hash(img_url) & 0xFFFFFFFF}.png" 
            
            img_name = img_name.split('?')[0]
            
            if '..' in img_name or '/' in img_name or '\\' in img_name:
                skipped_count += 1
                continue

            save_path = os.path.join(folder_name, img_name)

            # --- 7. Download and save the image (if it doesn't already exist) ---
            if not os.path.exists(save_path):
                img_response = requests.get(img_url, headers=headers, stream=True, timeout=10)
                img_response.raise_for_status()

                with open(save_path, 'wb') as f:
                    for chunk in img_response.iter_content(1024):
                        f.write(chunk)
                
                print(f"[SUCCESS] Downloaded: {img_name}")
                downloaded_count += 1
            else:
                skipped_count += 1


        except requests.exceptions.RequestException as e:
            # print(f"[ERROR] Could not download {img_url}: {e}")
            skipped_count += 1
        except IOError as e:
            print(f"[ERROR] Could not save image {img_name}: {e}")
            skipped_count += 1
        except Exception as e:
            # print(f"[UNEXPECTED ERROR] for {img_url}: {e}")
            skipped_count += 1

    print(f"\n--- SCRAPING COMPLETE ---")
    print(f"Target URL: {url}")
    print(f"Downloaded {downloaded_count} new images.")
    print(f"Skipped {skipped_count} items.")
    print(f"All files saved in: '{folder_name}'.")


# --- Configuration ---
TARGET_URL = "https://www.mindray.com/en/products/radiology"
# *** UPDATED FOLDER NAME ***
SAVE_FOLDER = "mindray_radiology_pictures"        

# --- Run the script ---
download_images(TARGET_URL, SAVE_FOLDER)