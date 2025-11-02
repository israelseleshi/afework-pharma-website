import os
import requests
from urllib.parse import urlparse

# --- 1. Define the Data Structure (Folder Names and URLs) ---
image_data = {
    "diagnostic_laboratory_solutions": [
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/products/laboratory-diagnostics/hematology/small-test-volume/bc-5150/glp13_img1.jpg",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/products/laboratory-diagnostics/hematology/small-test-volume/bc-5150/glp13-s3.jpg",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/products/laboratory-diagnostics/hematology/small-test-volume/bc-5150/glp13-s4-3.jpg",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/products/laboratory-diagnostics/hematology/small-test-volume/bc-5150/glp13-s4-2.jpg",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/products/laboratory-diagnostics/hematology/small-test-volume/bc-5150/glp13-s5-1.jpg",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/solutions/laboratory-diagnostics/3.jpg",
        "https://www.mindray.com/content/dam/xpace/en/innovation/million-annual-cbc-tests--a-total-solution-for-large-laboratories-to-achieve-better-performance/1.jpg",
        "https://www.mindray.com/content/xpace/en/products/laboratory-diagnostics/chemiluminescence-immunoassay.thumb.1280.1280.png",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/solutions/laboratory-diagnostics/5.jpg",
        "https://www.mindray.com/content/dam/xpace/zh/products-solutions/products/laborotaries-diagnostics/tla/mt8000/L.jpg",
    ],
    "diagnostic_imaging_radiology": [
        "https://store.mavenimaging.com/cdn/shop/files/general_imaging_ultrasound_machine_front_hero_960x720_pc.jpg?v=1751369824",
        "https://store.mavenimaging.com/cdn/shop/files/Consona_N6_diagnostic_ultrasound_front_894x671_pc_introduction_600x.jpg?v=1751528427",
        "https://store.mavenimaging.com/cdn/shop/files/TE_205_20SP_20System_20Image-1_600x.jpg?v=1751447540",
        "https://store.mavenimaging.com/cdn/shop/files/hepatus6-762x429_28885824-f2be-4045-ac9b-3bb61aab9023_600x.jpg?v=1751451373",
        "https://store.mavenimaging.com/cdn/shop/files/Consona_N6_diagnostic_ultrasound_system_1260x844_pc_600x.jpg?v=1751528443",
        "https://store.mavenimaging.com/cdn/shop/files/me8-1_600x.jpg?v=1751440398",
        "https://www.probomedical.co.uk/wp-content/uploads/sites/2/2023/03/Probo-Tampa-inventory-Ultrasound-Lineup-Logiqs-Photoshop-Edit-scaled.jpg",
        "https://radiologybusiness.com/sites/default/files/styles/gallery/public/2023-12/point_of_care_brain_microwave_imaging_system_emu_emvision_rsna23_df.jpeg.webp?itok=8QpxcpBm",
        "https://www.mavenimaging.com/hs-fs/hubfs/Digital_X-ray_Systems_1390x956.jpg?width=1390&height=926&name=Digital_X-ray_Systems_1390x956.jpg",
        "https://openmedscience.com/wp-content/uploads/2024/01/X-ray-Technology-in-Medicine-and-Science-1024x768.jpg",
    ],
    "critical_care_operation_theatre": [
        "https://mindray.scene7.com/is/image/mindray/A9-Front?scl=1",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/products/anesthesia/image/anesthesia-insight-anaesight.jpg",
        "https://www.mindray.com/content/dam/xpace/en_us/products-solutions/products/anesthesia/a-series-work-station/a9/images/hfnc.jpg",
        "https://www.mindray.com/content/dam/xpace/en_us/products-solutions/products/anesthesia/a-series-work-station/a9/images/cutting-edge-breathing-system.jpg",
        "https://www.mindray.com/content/dam/xpace/en_us/products-solutions/products/patient-monitoring/distribution-markets/images/A5-mid-acuity-anesthesia-system_984x671_PC-min.webp",
        "https://www.mindray.com/content/dam/xpace/en/media-center/press-center/news/mindray-brings-groundbreaking-new-systems-to-the-high-end-anesthesia-system-market/n27-s1.jpg",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/products/anesthesia/image/Anesthesia-s3.jpg",
        "https://hpaust.com/wp-content/uploads/2023/12/A5-web-800x600-1-300x225.jpg",
        "https://www.mindray.com/content/dam/xpace/en/products-solutions/products/anesthesia/a-series/a8/p4-s5-2.gif",
        "https://bomimed.ca/wp-content/uploads/2022/11/video-31.jpg",
    ],
    "hospital_furniture_patient_care": [
        "http://www.nilkamaledge.com/cdn/shop/articles/Healthcare-2.jpg?v=1704881448",
        "https://toruscare.com/wp-content/uploads/2025/04/%E6%9C%AA%E6%A0%87%E9%A2%98-1-4.jpg",
        "https://toruscare.com/wp-content/uploads/2025/04/%E6%9C%AA%E6%A0%87%E9%A2%98-1-3.jpg",
        "https://geeken.in/storage/2788/conversions/1761632957-x800.webp",
        "https://hausted.com/wp-content/uploads/h06884600_010-e1708713499860.jpg",
        "https://www.projesan.com.tr/images/urunler/2590891032722500_.jpg",
        "https://assets.isu.pub/document-structure/240502112902-ea0da357a49cf50b47a081cf952b1a3b/v1/fc135c9e54278575fae05eaddaf0cd6d.jpeg",
        "http://everythingmedicalonline.com/cdn/shop/products/akqzozseapvwd4k7fsj0_b452d30b-421c-4c0c-a6e9-23e6eb29c8db_1024x.jpg?v=1579583455",
        "https://www.projesan.com.tr/images/urunler/2590891136848900_.jpg",
        "https://www.krlynch.com/wp-content/uploads/2022/04/Hospital-Furniture-1200x804.jpg",
    ],
    "medical_consumables_reagents": [
        "https://www.mindray.com/content/dam/xpace/en/reagents/reagents.jpg",
        "https://image.made-in-china.com/365f3j00ePQoBFCZGmbM/Mindray-Chemistry-Analyzer-Reagent-Mindray-Compatible-original-Reagents-With-Good-Price.webp",
        "https://image.made-in-china.com/365f3j00nHqoImLMGFbB/Mindray-Original-Chemistry-Analyzer-Reagents-Bs-120-Bs-200-Bs-220-Bs-230-Bs-240-Bs-330-Bs-350-Alb-Alp-Alt-Ua-Urea.webp",
        "https://www.mindray.com/content/dam/xpace/en/media-center/press-center/press/free-testosterone-reagent-launch/free-testosterone-elisa-reagent-launch-reagent-family-1.0-en.jpg",
        "https://image.made-in-china.com/365f3j00eLakvTBbfmcM/Mindray-Chemistry-Analyzer-Reagent-Mindray-Compatible-original-Reagents-With-Good-Price.webp",
        "https://www.rajbiosis.org/assets/front/images/glp13-s6.jpg",
        "https://www.zenroxmed.com/wp-content/uploads/2025/08/ls-s14-2009-1.jpg",
        "https://image.made-in-china.com/365f3j00qPQcBVMlLwkC/Mindray-Chemistry-Analyzer-Reagent-Mindray-Compatible-original-Reagents-With-Good-Price.webp",
        "https://s.alicdn.com/@sc04/kf/Ha29eac65d06f4695b2a109120d552f0ae/Hot-Sale-PP-Plastic-60ml-Reagent-Bottle-for-Mindray-400-Chemistry-Analyzer-with-Factory-Price-Lab-Chemistry-Consumables.jpg",
        "https://hemediamed.com/wp-content/uploads/2025/02/P-06.jpg",
    ],
}


def download_structured_images(data):
    """
    Downloads images from provided URLs and saves them into category-specific folders.
    """
    total_downloaded = 0
    total_skipped = 0
    
    # Set a user-agent to mimic a browser
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    for folder_name, urls in data.items():
        print(f"\n--- Processing Category: {folder_name.upper().replace('_', ' ')} ({len(urls)} URLs) ---")
        
        # --- 2. Create folder if it doesn't exist ---
        os.makedirs(folder_name, exist_ok=True)
        print(f"Directory '{folder_name}' is ready.")

        for i, url in enumerate(urls):
            try:
                # --- 3. Extract a clean filename from the URL ---
                parsed_url = urlparse(url)
                img_name = os.path.basename(parsed_url.path)
                
                # Clean up query parameters (like ?v=1751369824) and ensure a file extension
                img_name = img_name.split('?')[0]
                
                # If no clear filename is available, use an indexed name
                if not img_name or len(img_name) < 4:
                    extension = ".jpg" # Default to JPG if no extension is found
                    # Attempt to find extension from headers if needed, but for now use simple index
                    img_name = f"image_{i+1}_{hash(url) & 0xFFFF}{extension}" 
                
                save_path = os.path.join(folder_name, img_name)

                # Skip if file already exists to prevent re-downloading
                if os.path.exists(save_path):
                    # print(f"  Skipping: {img_name} (Already exists)")
                    total_skipped += 1
                    continue
                
                # --- 4. Download and save the image ---
                img_response = requests.get(url, headers=headers, stream=True, timeout=15)
                img_response.raise_for_status() # Check for bad status codes

                with open(save_path, 'wb') as f:
                    for chunk in img_response.iter_content(1024):
                        f.write(chunk)
                
                print(f"  [SUCCESS] Downloaded: {img_name}")
                total_downloaded += 1

            except requests.exceptions.RequestException as e:
                print(f"  [ERROR] Could not download URL {i+1} ({url}): {e}")
                total_skipped += 1
            except Exception as e:
                print(f"  [UNEXPECTED ERROR] processing URL {i+1} ({url}): {e}")
                total_skipped += 1

    print("\n\n###########################################")
    print(f"STRUCTURED DOWNLOAD COMPLETE: Total Downloaded: {total_downloaded} files.")
    print(f"Total Skipped/Failed: {total_skipped} files.")
    print("Files are neatly organized into 5 separate folders.")
    print("###########################################")


# --- Run the Script ---
download_structured_images(image_data)