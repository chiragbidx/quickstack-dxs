import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
// import { signOut } from '@/app/(login)/actions'; // Removed because the (login) folder is deleted
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';

// Please move or implement signOut logic elsewhere if required.

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      {/* Your layout UI */}
      {children}
    </section>
  );
}