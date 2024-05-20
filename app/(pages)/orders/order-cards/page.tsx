import OrderCard from './_components/OrderCard';

export default function ViewOrderCards() {
  const dateTime = new Date('2024-03-01T10:36:01.516Z');
  return (
    <div>
      <OrderCard
        title="Lightweight Water-Resistant Hooded Puffer Coat"
        date={dateTime}
        status={3}
        image="/sample-product/puffer.png"
        icon={0}
      />
    </div>
  );
}
