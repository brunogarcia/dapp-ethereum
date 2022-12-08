/// <reference types="vite/client" />

import { ethers } from "ethers";

const { ExternalProvider } = ethers.providers;

/**
 * If we have Metamask browser extension wallet installed,
 * it will automatically inject a special object named ethereum into our window.
 */
declare global {
  interface Window {
    ethereum: ExternalProvider;
  }
}