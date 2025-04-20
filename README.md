# FoodLoop - Connecting Retailers and NGOs to Reduce Food Waste

![FoodLoop Homepage](assets/foodloop-homepage.png)

## Overview

FoodLoop is a platform designed to connect food retailers with nearby Non-Governmental Organizations (NGOs). This connection facilitates the donation of surplus food items from retailers to NGOs, helping to reduce food waste and support communities in need.

The platform provides separate dashboards for Retailers and NGOs, each tailored to their specific needs and workflows.

**Key Features:**

**Retailer Dashboard:**

1.  **Nearby Asked Food:** Retailers can view a list of food items requested by nearby NGOs (within the same pincode). This allows retailers with surplus food to quickly identify and connect with organizations that need it.
    * A "Connect" button allows retailers to access the contact information of the requesting NGO.
2.  **Inventory Management:** Retailers can manage their stock, with each item displayed as a card.
    * Each card shows the food name, purchase date, best before date, and expiration date.
    * A colored dot visually indicates the condition of the food:
        * **Green:** Excellent condition (before the best before date).
        * **Yellow:** Consumable but not in best condition (should be listed for NGOs).
        * **Red:** Potentially expired.
    * A "List" button allows retailers to make a food item available for NGOs to request.
    * A "Sold" (cross) button marks an item as sold and removes it from the inventory.

**NGO Dashboard:**

1.  **Nearby Listed Food:** NGOs can see a list of food items that nearby retailers have listed as available.
    * A "Contact" button allows NGOs to get in touch with the retailer to arrange for the food.
2.  **Request Section:** NGOs can create and submit requests for specific food items they need, along with details like quantity, desired pickup date, and any additional notes.

## Tech Stack

* **Frontend:** React, Shadcn UI
* **Backend:** Flask
* **Authentication:** JWT (JSON Web Tokens)

## Getting Started (Conceptual - Requires the Full Repository)

This `README.md` provides a high-level overview based on the provided information. For detailed setup and running instructions, please refer to the complete repository documentation. Typically, you would follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd foodloop
    ```

2.  **Navigate to the backend and set up the Flask environment:**
    ```bash
    cd backend
    # Follow backend-specific setup instructions (e.g., virtual environment, dependencies)
    pip install -r requirements.txt
    # Run database migrations (if applicable)
    # flask db upgrade
    flask run
    ```

3.  **Navigate to the frontend and set up the React environment:**
    ```bash
    cd ../frontend
    npm install
    npm start
    ```

    or

    ```bash
    yarn install
    yarn start
    ```

4.  **Open your browser** and navigate to the address where the React app is running (usually `http://localhost:3000`).

## API Documentation

The Flask backend API follows the structure outlined below (as per the prompt):

**Authentication:**

* `POST /sign-up`: User registration.
* `POST /auth-login`: User login, returns a JWT token in the `token` field upon successful authentication.

**Retailer Endpoints (Requires JWT in the `Authorization` header as `Bearer <token>`):**

* `GET /retailers/inventory`: Fetch the retailer's inventory.
* `POST /retailers/inventory/<inventory_item_id>/list`: List an inventory item for NGOs.
* `POST /retailers/inventory/<inventory_item_id>/sell`: Mark an inventory item as sold.
* `DELETE /retailers/item/remove/<int:item_id>`: Remove an item from inventory.
* `POST /retailers/add_item`: Add a new item to the retailer's inventory.
* `POST /retailers/predict_dates`: (Conceptual) Predict best before and expiration dates using the Gemini API.

**NGO Endpoints (Requires JWT in the `Authorization` header as `Bearer <token>`):**

* `GET /ngo/filtered_food`: Fetch a list of nearby listed food items.
* `POST /ngo/request`: Submit a new food request.

**User Endpoints (Likely used for fetching user details, including `pincode` and `contact`):**

* (Refer to the backend API documentation for specific user-related endpoints)

## Frontend Structure (Conceptual)

The React frontend will likely have the following directory structure: