import { DashboardLayout } from '@/components/layouts';
import { FormSwapCurrency } from '@/features/dashboard/components/form-swap-currency';

const LandingRoute = () => {
  return (
    <DashboardLayout title="Dashboard">
      <FormSwapCurrency />
    </DashboardLayout>
  );
};

export default LandingRoute;
