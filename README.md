# Running the App

To run the app, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/your-repo.git
    cd your-repo
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and add the following variables:
   
    Example `.env` file:
    ```env
    MONGO_URI=
    NEXTAUTH_SECRET=1234567890abcdef
    ```

4. Start the application:
    ```sh
    npm run dev
    ```

Your app should now be running on `http://localhost:3000`.