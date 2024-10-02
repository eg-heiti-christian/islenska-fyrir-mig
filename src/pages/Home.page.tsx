import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Welcome } from '../components/Welcome/Welcome';
import { ThemeToggle } from '../components/ThemeToggle/ThemeToggle';

export function HomePage() {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <ThemeToggle />
    </>
  );
}
