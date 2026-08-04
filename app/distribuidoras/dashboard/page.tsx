import { CreditCardHeader } from '@/app/_components/dashboard/distribuidoras/CreditCardHeader';
import { QuickActions } from '@/app/_components/dashboard/distribuidoras/QuickActions';
import { BillingSummary } from '@/app/_components/dashboard/distribuidoras/BillingSummary';
import { BottomNav } from '@/app/_components/dashboard/distribuidoras/BottomNav';

export default function DistribuidoraDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-100 pb-24 font-sans text-slate-800 antialiased max-w-md mx-auto shadow-2xl relative">
      <CreditCardHeader />
      <QuickActions />
      <BillingSummary />
      <BottomNav />
    </div>
  );
}