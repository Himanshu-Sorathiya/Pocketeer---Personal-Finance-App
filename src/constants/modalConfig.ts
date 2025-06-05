const modalIds = [
  "create_transaction",
  "edit_transaction",
  "delete_transaction",
  "create_budget",
  "edit_budget",
  "delete_budget",
  "create_pot",
  "edit_pot",
  "delete_pot",
  "pot_add_money",
  "pot_withdraw_money",
  "forgot_password",
  "update_profile",
  "currency_conversion",
  "action_not_allowed",
] as const;

type ModalId = (typeof modalIds)[number];

export { type ModalId, modalIds };
