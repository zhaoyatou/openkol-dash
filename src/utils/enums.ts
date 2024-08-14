export function incomeType2Text(t: string): string {
  switch (t) {
    case "invite_withdraw":
      return "邀请/提现";
    case "invite_new_user_reward":
      return "邀请/新用户奖励";
    case "invite_user_profit_sharing":
      return "邀请/用户收益分成";
    case "invite_admin_operation":
      return "邀请/管理员操作";
    case "content_profit_withdraw":
      return "内容收益/提现";
    case "content_profit_new":
      return "内容收益/新增";
    case "content_profit_admin_operation":
      return "内容收益/管理员操作";
    default:
      return t;
  }
}

export const incomeTypes = (all: boolean) => {
  const res = [
    { label: "邀请/提现", value: "invite_withdraw" },
    { label: "邀请/新用户奖励", value: "invite_new_user_reward" },
    { label: "邀请/用户收益分成", value: "invite_user_profit_sharing" },
    { label: "邀请/管理员操作", value: "invite_admin_operation" },
    { label: "内容收益/提现", value: "content_profit_withdraw" },
    { label: "内容收益/新增", value: "content_profit_new" },
    { label: "内容收益/管理员操作", value: "content_profit_admin_operation" }
  ];
  if (all) {
    res.unshift({ label: "全部", value: "" });
  }
  return res;
};

export function advertisementLocation2Text(t: string): string {
  switch (t) {
    case "home":
      return "首页";
    default:
      return t;
  }
}

export const advertisementLocations = (all: boolean) => {
  const res = [{ label: "首页", value: "home" }];
  if (all) {
    res.unshift({ label: "全部", value: "" });
  }
  return res;
};

export function articleVisibility2Text(t: string): string {
  switch (t) {
    case "public":
      return "公开";
    case "detail":
      return "详情页可见";
    case "draft":
      return "草稿";
    default:
      return t;
  }
}

export const articleVisibilities = (all: boolean) => {
  const res = [
    { label: "公开", value: "public" },
    { label: "详情页可见", value: "detail" },
    { label: "草稿", value: "draft" }
  ];
  if (all) {
    res.unshift({ label: "全部", value: "" });
  }
  return res;
};

export function platformJoinStatus2Text(t: string): string {
  switch (t) {
    case "pending":
      return "待审核";
    case "supplement":
      return "待补充";
    case "register":
      return "待注册";
    case "reject":
      return "驳回";
    case "pass":
      return "通过";
    default:
      return t;
  }
}

export const platformJoinStatuses = (all: boolean) => {
  const res = [
    { label: "待审核", value: "pending" },
    { label: "待补充", value: "supplement" },
    { label: "待注册", value: "register" },
    { label: "驳回", value: "reject" },
    { label: "通过", value: "pass" }
  ];
  if (all) {
    res.unshift({ label: "全部", value: "" });
  }
  return res;
};

export function withdrawAccountType2Text(t: string): string {
  switch (t) {
    case "alipay":
      return "支付宝";
    case "wechat":
      return "微信";
    case "bank":
      return "银行卡";
    default:
      return t;
  }
}

export const withdrawAccountTypes = (all: boolean) => {
  const res = [
    { label: "支付宝", value: "alipay" },
    { label: "微信", value: "wechat" },
    { label: "银行卡", value: "bank" }
  ];
  if (all) {
    res.unshift({ label: "全部", value: "" });
  }
  return res;
};

export function withdrawRequestType2Text(t: string): string {
  switch (t) {
    case "invite":
      return "邀请";
    case "content":
      return "内容";
    default:
      return t;
  }
}

export const withdrawRequestTypes = (all: boolean) => {
  const res = [
    { label: "邀请", value: "invite" },
    { label: "内容", value: "content" }
  ];
  if (all) {
    res.unshift({ label: "全部", value: "" });
  }
  return res;
};

export function withdrawRequestStatus2Text(t: string): string {
  switch (t) {
    case "pending":
      return "待审核";
    case "approved":
      return "已通过";
    case "rejected":
      return "已驳回";
    default:
      return t;
  }
}

export const withdrawRequestStatuses = (all: boolean) => {
  const res = [
    { label: "待审核", value: "pending" },
    { label: "已通过", value: "approved" },
    { label: "已驳回", value: "rejected" }
  ];
  if (all) {
    res.unshift({ label: "全部", value: "" });
  }
  return res;
};
