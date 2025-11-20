import { Users } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { ActiveUser } from '@/types/socket';
import { JSX } from 'react';

interface ActiveUsersIndicatorProps {
  users: ActiveUser[];
}

export function ActiveUsersIndicator({ users }: ActiveUsersIndicatorProps): JSX.Element | null {
  if (users.length === 0) return null;

  return (
    <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-2">
      <Users className="h-4 w-4 text-blue-600" />
      <span className="text-sm text-blue-700 font-medium">
        {users.length} {users.length === 1 ? 'user' : 'users'} editing
      </span>
      <div className="flex -space-x-2">
        {users.slice(0, 3).map((user) => (
          <Avatar key={user.userId} className="h-8 w-8 border-2 border-white">
            <AvatarFallback className="bg-blue-500 text-white text-xs">
              {user.userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
        {users.length > 3 && (
          <div className="h-8 w-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-xs text-white font-medium">
            +{users.length - 3}
          </div>
        )}
      </div>
    </div>
  );
}
