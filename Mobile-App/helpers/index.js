export const rupiahFormat = (num) => "Rp. " + num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
