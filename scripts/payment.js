/**
 * Create a new PaymentRequest Object.
 * @param {Array} paymentMethods - Payments methods allowed.
 * @param {PaymentDetailsInit} paymentDetails - Details of the payment.
 * @param {Object} options - Further informations to ask to the user.
 * @returns {PaymentRequest}
 */
const createPayment = (paymentMethods, paymentDetails, options) => (
  new PaymentRequest(
    paymentMethods,
    paymentDetails,
    options
  )
);

/**
 * On click on the element, show the payment window.
 * @param {HTMLElement} element - HTMLElement.
 * @param {PaymentRequest} paymentRequest - Instance of PaymentRequest.
 */
const triggerPayment = (element, paymentRequest) => {
  element.addEventListener('click', _ => {
    paymentRequest.show()
      .then(paymentResponse => paymentResponse.complete('success'))
      .catch(error => console.error(error.message));
  })
}

if (window.PaymentRequest) {
  const paymentEl = document.querySelector('.donate');
  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.innerHTML = 'Donate 4.99€ 🍵!';
  button.classList.add('donate__button');
  paymentEl.append(button);

  const supportedPaymentMethods = [
    {
      supportedMethods: 'basic-card',
    }
  ];
  const paymentDetails = {
    total: {
      label: 'May I ask you a cup of tea 🍵? Thank you!',
      amount:{
        currency: 'EUR',
        value: 4.99
      },
    },
  };
  const options = {
    requestPayerName: true,
  };
  const paymentRequest = createPayment(
    supportedPaymentMethods,
    paymentDetails,
    options
  );

  triggerPayment(button, paymentRequest)

} else {
  console.warn('Payment Request is not supported...');
}