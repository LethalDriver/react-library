import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";

import App from './App'; // Import the App component
import AuthProvider from './service/authProvider';
import { ApiProvider } from './service/apiProvider';
import "./i18n";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ChakraProvider>
        <ApiProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        </ApiProvider>
      </ChakraProvider>
    </React.StrictMode>
  );
}
