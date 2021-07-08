;(() => {
    const orderId = new URL(location.href).searchParams.get('orderId') || 'ERREUR'
    document.getElementById('order__id').textContent = orderId
  })()
