export interface IDiscountCouponStatus {
  status: string;
  reserved_by: string | null;
  used_by: string | null;
}

export interface IDiscountCard {
  card_number: number;
  phone_number: number;
}

export default interface IDiscountCoupon {
  id: string;
  status: IDiscountCouponStatus;
  discount_image: string;
  discount_title: string | null;
  discount_description: string | null;
  start_validity_period: Date;
  end_validity_period: Date;
  discount_card: IDiscountCard;
  is_public: boolean;
}
