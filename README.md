fully functional React app that implements a shopping cart for domain purchases. It allows users to input domain names they want to buy and checks their availability using a mock API. The component provides a smooth and intuitive user interface with various features.

Users can add domain names to the cart by typing them in and hitting "Enter" or clicking a button. The input validation ensures that the domain name is in the correct format and ends with either .com, .xyz, or .app. The component automatically converts the domain name to lowercase for consistency.

The cart prevents duplicate entries, ensuring that each domain appears only once. Users can view the list of domains in their cart and delete individual domains if needed. The availability status of each domain is displayed, indicating whether it is available for purchase.

The cart keeps track of the number of domains added, both available and unavailable, and compares it to the numDomainsRequired parameter. This information is visually represented to show the user how "full" the cart is and whether they have added too many domains.

If the cart contains exactly the required number of domains, a purchase button is displayed. Clicking this button allows the user to proceed with the purchase. If the cart size is incorrect, the purchase button is disabled.

In addition to the core functionality, the script includes several additional buttons below the list of domains. These buttons provide extra features such as clearing the cart, removing unavailable domains, copying the domains to the clipboard, and keeping only the "best" domains based on specific criteria.

The script utilizes the Chakra UI component library, providing a visually appealing and responsive design. It follows modern React practices, using functional components and hooks like useState, useMemo, and useCallback. TypeScript is used throughout the codebase, ensuring explicit typing for variables and functions.

The script has been thoroughly tested and passes all build, lint, and type checking checks. It adheres to a functional and immutable coding style, utilizing libraries like lodash and immutable for enhanced functionality. The code is well-documented with comments, making it easy to understand and maintain. Overall, the script meets all the requirements and provides a polished and user-friendly shopping cart experience for domain purchases.