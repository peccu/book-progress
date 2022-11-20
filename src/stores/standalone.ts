type SafariNavigator = Navigator & { readonly standalone: boolean };
export const needToAddToHomeScreen = () => {
  return (
    "standalone" in window.navigator &&
    (window.navigator as SafariNavigator).standalone !== true
  );
};
