// @ts-ignore TYPE NEEDS FIXING
import transakSDK from '@transak/transak-sdk'

export default function Buyicp() {

  const transak = new transakSDK({
    apiKey: 'f619d86d-48e0-4f2f-99a1-f827b719ac0b',  // Your API Key (Required)
    environment: 'PRODUCTION', // STAGING/PRODUCTION (Required)
    defaultCryptoCurrency: 'ICP',
    walletAddress: '', // Your customer wallet address
    themeColor: '000000', // App theme color in hex
    email: '', // Your customer email address (Optional)
    redirectURL: '',
    hostURL: window.location.origin, // Required field
    widgetHeight: '550px',
    widgetWidth: '450px',
    hidemenu: true,
  })

  transak.init()

  // To get all the events
  // @ts-ignore TYPE NEEDS FIXING
  transak.on(transak.ALL_EVENTS, (data) => {
    console.log('ALL_EVENTS', data)
  })

  // This will trigger when the user closed the widget
  // @ts-ignore TYPE NEEDS FIXING

  // This will trigger when the user closed the widget
  transak.on(transak.EVENTS.TRANSAK_WIDGET_CLOSE, () => {
    transak.close();
  });

  // This will trigger when the user marks payment is made.
  // @ts-ignore TYPE NEEDS FIXING
  transak.on(transak.EVENTS.TRANSAK_ORDER_SUCCESSFUL, (orderData) => {
    console.log('TRANSAK_ORDER_SUCCESSFUL', orderData)
    window.alert("Payment Success")
    transak.close()
  });

  return (
    <section>
    </section>
  )
}