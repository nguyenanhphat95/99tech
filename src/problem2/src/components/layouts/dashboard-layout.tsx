import { Home, PanelLeft } from 'lucide-react';
import { NavLink } from 'react-router';

import logo from '@/assets/99Tech.svg';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { paths } from '@/config/paths';
import { cn } from '@/utils/cn';

import { Head } from '../seo';
import { Link } from '../ui/link';

type SideNavigationItem = {
  name: string;
  to: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

const Logo = () => {
  return (
    <Link className="flex items-center text-white" to={paths.home.getHref()}>
      <img className="h-8 w-auto" src={logo} alt="Workflow" />
      <span className="text-sm font-semibold text-white">99 Tech team</span>
    </Link>
  );
};

export function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const navigation = [
    { name: 'Dashboard', to: paths.home.getHref(), icon: Home },
  ].filter(Boolean) as SideNavigationItem[];

  return (
    <>
      <Head title={title} />
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <div className="flex h-16 shrink-0 items-center px-4">
              <Logo />
            </div>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.to}
                end={item.name !== 'Discussions'}
                className={({ isActive }) =>
                  cn(
                    'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                    isActive && 'bg-gray-900 text-white',
                  )
                }
              >
                <item.icon
                  className={cn(
                    'text-gray-400 group-hover:text-gray-300',
                    'mr-4 size-6 shrink-0',
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
          <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
            <Drawer>
              <DrawerTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="size-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent
                side="left"
                className="bg-black pt-10 text-white sm:max-w-60"
              >
                <nav className="grid gap-6 text-lg font-medium">
                  <div className="flex h-16 shrink-0 items-center px-4">
                    <Logo />
                  </div>
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.to}
                      end
                      className={({ isActive }) =>
                        cn(
                          'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex flex-1 w-full items-center rounded-md p-2 text-base font-medium',
                          isActive && 'bg-gray-900 text-white',
                        )
                      }
                    >
                      <item.icon
                        className={cn(
                          'text-gray-400 group-hover:text-gray-300',
                          'mr-4 size-6 shrink-0',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </NavLink>
                  ))}
                </nav>
              </DrawerContent>
            </Drawer>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
