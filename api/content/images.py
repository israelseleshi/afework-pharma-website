import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

def download_images(url, folder_name):
    """
    Downloads all images from a given URL into a specified folder.
    """
    
    # --- 1. Create the folder if it doesn't exist ---
    if not os.path.exists(folder_name):
        try:
            os.makedirs(folder_name)
            print(f"Directory '{folder_name}' created.")
        except OSError as e:
            print(f"Error creating directory {folder_name}: {e}")
            return
    else:
        print(f"Directory '{folder_name}' already exists. Adding files to it.")

    # --- 2. Fetch the webpage content ---
    try:
        # Set a user-agent to mimic a browser, as some sites block default scripts
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an error for bad responses (4xx or 5xx)
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        return

    # --- 3. Parse the HTML ---
    soup = BeautifulSoup(response.text, 'html.parser')

    # --- 4. Find all image tags ---
    # We look for <img> tags. We also could look for <picture> tags or CSS backgrounds,
    # but this script focuses on the most common <img> elements.
    img_tags = soup.find_all('img')
    print(f"Found {len(img_tags)} image tags.")

    downloaded_count = 0
    skipped_count = 0

    for img in img_tags:
        img_url = None
        
        # Check 'data-src' or 'data-lazy-src' for lazy-loaded images, then 'src'
        if img.get('data-src'):
            img_url = img.get('data-src')
        elif img.get('data-lazy-src'):
            img_url = img.get('data-lazy-src')
        elif img.get('src'):
            img_url = img.get('src')
        
        if not img_url:
            # Skip tags without a 'src', 'data-src', or 'data-lazy-src' attribute
            skipped_count += 1
            continue
            
        # Skip tiny or inline images (data URIs)
        if img_url.startswith('data:image/'):
            print(f"Skipping inline data image.")
            skipped_count += 1
            continue

        # --- 5. Make relative URLs absolute ---
        img_url = urljoin(url, img_url)

        # --- 6. Get the image file name ---
        try:
            # Parse the URL to get the path, then take the last part as the filename
            img_name = os.path.basename(urlparse(img_url).path)
            
            # If no path, create a generic name
            if not img_name:
                # Use a hash of the URL or a simple count to create a unique name
                img_name = f"image_{hash(img_url)}.jpg" # Fallback name
            
            # Clean up potential query parameters in the name
            img_name = img_name.split('?')[0]

            # Avoid directory traversal or other path issues
            if not img_name or '..' in img_name or '/' in img_name or '\\' in img_name:
                print(f"Skipping potentially unsafe or invalid filename: {img_name}")
                skipped_count += 1
                continue

            save_path = os.path.join(folder_name, img_name)

            # --- 7. Download and save the image (if it doesn't already exist) ---
            if not os.path.exists(save_path):
                print(f"Downloading {img_url} to {save_path}...")
                img_response = requests.get(img_url, headers=headers, stream=True)
                img_response.raise_for_status()

                with open(save_path, 'wb') as f:
                    for chunk in img_response.iter_content(1024):
                        f.write(chunk)
                downloaded_count += 1
            else:
                print(f"Skipping already downloaded file: {img_name}")
                skipped_count += 1


        except requests.exceptions.RequestException as e:
            print(f"Could not download {img_url}: {e}")
            skipped_count += 1
        except IOError as e:
            print(f"Could not save image {img_name}: {e}")
            skipped_count += 1
        except Exception as e:
            print(f"An unexpected error occurred for {img_url}: {e}")
            skipped_count += 1

    print(f"\nDone.")
    print(f"Downloaded: {downloaded_count} new images.")
    print(f"Skipped:    {skipped_count} (already downloaded, inline, or errors).")
    print(f"Total files saved in '{folder_name}'.")


# --- Configuration ---
# The specific page you requested
TARGET_URL = "https://www.mindray.com/en/products/ultrasound"
# The folder you requested in our first conversation
SAVE_FOLDER = "mindray_pictures"        

# --- Run the script ---
download_images(TARGET_URL, SAVE_FOLDER)