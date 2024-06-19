export function getCategoryColor(category: string) {
  switch (category) {
    case '10':
      return 'success'
    case '20':
      return 'primary'
    case '30':
      return 'danger'
    default:
      return 'success'
  }
}
