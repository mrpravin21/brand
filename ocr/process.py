import os
from PIL import Image
import pytesseract
import re

# Set Tesseract command path
pytesseract.pytesseract.tesseract_cmd = '/opt/homebrew/bin/tesseract'

# Folder with images
IMAGE_FOLDER = '/Users/rohan54/Tinyties/brand/ocr/images'

# Process each image
for image_file in os.listdir(IMAGE_FOLDER):
    if image_file.endswith(('png', 'jpg', 'jpeg')):
        image_path = os.path.join(IMAGE_FOLDER, image_file)
        image = Image.open(image_path)
        
        # Extract text using OCR
        text = pytesseract.image_to_string(image)
        
        # Parse all age data using regex
        age_data = re.findall(r'(\d{2}-\d{2}|\d{2})\s*[:\-\s]*\s*(\d+\.?\d*)%', text)
        
        # Extract profile visits and change
        profile_visits = re.search(r'Profile visits.*?(\d+)', text)
        change = re.search(r'(-?\d+\.?\d*)%', text)
        
        # Format the extracted data
        age_data_str = ", ".join([f"{age} - {percentage}%" for age, percentage in age_data]) if age_data else "No age data"
        profile_visits_str = profile_visits.group(1) if profile_visits else "No profile visits"
        change_str = change.group(1) if change else "No change"
        
        # Print the results in a concise format
        print(f"{image_file} | Age Data: {age_data_str} | Profile Visits: {profile_visits_str} | Change: {change_str}")
