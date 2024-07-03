export enum RoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const USER_TYPES = [
  { code: 'ADMIN', label: 'Admin' },
  // { code: 'USER', label: 'User' },
];

export const ORDER_STATUS_TYPES = [
  { code: 'PAID', label: 'Đã thanh toán' },
  { code: 'UNPAID', label: 'Chưa thanh toán' },
];

export const DOMAIN_TYPES = [
  { code: 'NORTH', label: 'Miền Bắc' },
  { code: 'MID', label: 'Miền Trung' },
  { code: 'SOUTH', label: 'Miền Nam' },
];
