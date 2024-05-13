import ContactInfo from './_components/ContactInfo/ContactInfo';
import CreditCardPayment from './_components/CreditCardPayment/CreditCardPayment';
import Navigator from './_components/Navigator/Navigator';
import OrderDescription from './_components/OrderDescription/OrderDescription';
import ProgressBar from './_components/ProgessBar/ProgressBar';
import ShippingLabel from './_components/ShippingLabel/ShippingLabel';

import styles from './page.module.scss';

export default function ViewOrders() {
  return (
    <div className={styles.container}>
      <ProgressBar />
      <div className={styles.main}>
        <OrderDescription />
        <ContactInfo />
        <ShippingLabel />
        <CreditCardPayment />
      </div>
      <Navigator />
    </div>
  );
}
