import { Icon } from '@iconify/react';
interface StatusBadgeProps {
  status?: 'active' | 'inactive';
  noIcon?: boolean;
}
export const StatusBadge = ({ status, noIcon }: StatusBadgeProps) => {
  if (status === 'active') {
    return (
      <div className="flex gap-2 rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 font-medium items-center">
        {!noIcon && <Icon icon="icon-park-outline:dot" className='text-xs text-blue-500'/>}
        <div className="text-xs min-w-[3rem] text-center text-blue-700">Active</div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 font-medium items-center">
      {!noIcon && <Icon icon="icon-park-outline:dot" className='text-xs text-gray-500'/>}
      <div className="text-xs min-w-[3rem] text-center text-gray-700">Inactive</div>
    </div>
  );
};
