import { StatusBar } from 'expo-status-bar';

import Navigation from './navigation';
import useCachedResources from './hook/useCachedResources';

export default function App() {
  const isLoaded= useCachedResources();
  if (isLoaded){
    return (
      <>
  
        <Navigation />
        <StatusBar style="auto" />
      </>
    );
  } else {
    return null;
  }
  
}

