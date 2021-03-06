import enLocale from 'element-ui/lib/locale/lang/en'
export default {
  languages: [
    {
      text: "中文",
      val: "zh"
    },
    {
      text: "English",
      val: "en"
    }
  ],
  menus: {
    yesterdayData: "Data Yesterday",
    qdManage: "Agent Management",
    addQd: "New Agent",
    merManage: "Merchant",
    merChainManage: "Chain Store Management",
    merChainList: "Records",
    salesmanManage: "Sales Rep.",
    tradeManage: "Transactions",
    forms: "Reports",
    formMerIn: "New Merchants",
    formTrade: "Merchant Transactions",
    formChannel: "Agent Merchant Statistic",
    formCTrade: "Agent Transactions",
    formSalesman: "Sales Rep. Statistic",
    formLostMer: "Merchant Loss",
    settle: "Payouts",
    merSettle: "Merchant Payout Bill",
    qdFenrun: "Agent Profits",
    ad: "Advertisements",
    aders: "Advertiser",
    notice: "Notifications",
    addNotice: "New Notifications",
    meterial: "Training",
    noCard: "无卡快捷",
    noMerchant: "设置商户默认费率",
    busyCircle: "商圈管理",
    busyAlliance: "商家联盟"
  },
  app: {
    logout: "Logout",
    fixPass: "Change Password",
    myFenrun: "My Profits",
    backLogin: "Return",
    backLogin_d: "Change password success. Please click on Confirm and login again.",
    oldPass: "Old Password",
    newPass: "New Password",
    newPass2: "Confirm",
    oldPass_input: "",
    Pass_error: "6 to 20 characters",
    newPass_input: "",
    newPass2_input: "6 to 20 characters",
    newPass2_error: "2 passwords does not match",
    noticeD: "Announcement Detail", 
    noticeTitle: "Title", 
    noticeDetail: "Contents", 
    timeout: "Time Out",
    dataLoading: "Loading",
    save: "Save",
    sure: "Confirm",
    cancle: "Cancel",
    unitGe: "",
    unitMoneyZh: "", //废弃
    unitMoney: "", //USD-废弃
    search: "Search",
    clickScan: "Details",
    operate: "Operation",
    note: "Notes",
    all: "All",
    return: "Return",
    modify: "Modify",
    unitMoneyBack: "", //USD-废弃
    scan: "Details",
    ifSureMend: "Confirm Modify?",
    saveSure: "Submit",
    fixSuccess: "Success!",
    scanDetail: "Details",
    tips: "Tips",
    merLogoutMY: "Do you want to deactivate this merchant?",
    merLogoutMY2: "Merchant cannot login merchant app and make transactions after deactivation.",
    merLogoutMN: "Do you want to cancel the deactivation?",
    merLogoutMN2: "Merchant can login merchant app and make transactions after cancelling deactivation.",
    migrate: "迁移",
    save:"Save"
  },
  yanzheng: {
    qdNum: "Please enter agent number, numbers only",
    qdName: "请输入渠道名称，长度在 1 到 30 个字符", //暂不使用
    merNum: "Please enter Merchant No., numbers only",
    merNumId: "Please enter Merchant ID, numbers only",
    merName: "Please enter merchant name. 1 to 20 characters",
    merNameL: "Please enter merchant name. 1 to 30 characters",
    merName1: "请输入店铺名称，长度在 1 到 20 个字符",
    tel: "Please enter a correct phone number",
    salesman: "Please enter Sales Rep. 1 to 20 characters",
    salesmanNameM: "Please enter Salesman Name. 1 to 20 characters",
    salesmanL: "Please enter Sales Rep. 1 to 30 characters",
    sonMer: "Please enter Sub-Merchant No. 1 to 128 characters",
    salesmanSel: "Select Sales Rep.",
    salesmanNum: "Please enter Sales Rep. No. 1 to 20 characters",
    salesmanName: "Please enter Sales Rep. Name. 1 to 30 characters",
    tradeNum: "Please enter Serial No. 1 to 200 characters",
    orderNum: "Please enter order no. 1 to 128 characters",
    timeThan: "End time should be smaller than Start time",
    timeMonth: "Searching cannot across months",
    authProSel: "Select Province",
    authCitySel: "Select City",
    telAll: "Phone No.",
    email: "Email",
    idNumber: "ID No.",
    picture: "Photo",
    pictureLength: "Photo size should be less than 10m",
    selBank: "Bank",
    selBranchBank: "Branch",
    selProvince: "Province/State",
    selCity: "City",
    bankaccount: "Enter bank account No. 1 to 50 characters",
    selBankType: "Select Settlement Type",
    selCardType: "Select Account Type",
    cardOwnerName: "Please enter Account Name 1 to 25 characters",
    legalName: "Please enter owner’s name in 1-20 characters.",
    loginName: "渠道系统的登录账号以及渠道识别码",
    loginNameString: "1-15 digits only, alphabet and/or number. Please try again",
    loginNameNum: "1-15 digits only, alphabet and/or number. Please try again",
    loginNameNumMerchant: "1-15 digits only, alphabet and/or number. Please try again",
    chainId:"Please enter Group ID, numbers only",
    qdId:"Please enter Agent ID, numbers only",
    shopId:"Please enter the store ID，multiple stores width a comma ',' break to distinguish",
    bandName:"Enter brand name, 1 to 100 characters",
    bandName1:"Enter brand name, 1 to 30 characters",
    companyName:"Enter company name, 1 to 100 characters",
    // SalesName:"Enter sales account, 1 to 15 characters",
    SalesName:"Please enter Phone No.",
    merStyle:"2-4 digits only. Please try again.",
    contact:"Enter contact, 1 to 128 characters",
    contactMobile:"Please enter Contact Number",
    contactEmail:"Email",
    bank:"Enter bank name, 1 to 50 characters",
    branch:"Enter branch bank, 1 to 256 characters",
    bankcode:"Enter account, 1 to 256 characters",
    bankcode1:"Enter account name, 1 to 256 characters",
    bankNum:"Enter Bank Account No./IBAN No., 1 to 256 characters",
    swift:"Enter swift code, 1 to 50 characters",
    rule:"1-9 digits only. Please try again.",
    fee: "Please enter a correct MDR",
    placeholder:{
      brand:"Max length is 100 characters",
      companyName:"Max length is 100 characters",
      merStyle:"Numbers only",
      head_bankname:"Max length is 50 characters",
      branch_bankname:"Max length is 256 characters",
      bankNameAccount1:"Max length is 256 characters",
      bankaccount:"Single choice",
      clear_rule:"Hong Kong only,numbers only",
    }
  },
  login: {
    qdSystem: "QF Pay Agent System",
    userLogin: "Login",
    login: "Login",
    // yanzhengName: 'Account Phone No./Email',
    yanzhengName: "Please enter Phone No.",
    yanzhengPass: "Password between 6 to 20 characters",
    yanzhengName1: "请输入用户名（手机号码/邮箱/登录名）"
  },
  generalPro: {
    dateBank: {
      lastWeek: "Recent Week",
      lastMonth: "Recent Month",
      lastThreeM: "Recent 3 Months"
    },
    yanzheng: {
      input: "Please enter",
      length: "",
      to: "to",
      string: "characters",
      chinese: "Chinese",
      inputSlect: "Select "
    },
    options: {
      toPrivate: "Personal Account", //no
      toPublic: "Company Account" //no
    },
    searchBank: {
      qdNum: "Agent No.：",
      qdName: "Agent Name：",
      qdNameBelong: "Agent Name：",
      qdStatus: "Agent State：",
      active: "Active",
      inactive: "Inactive",
      frozen: "已冻结",
      timeRange: "Time：",
      timeRangeD: "Select Date",
      timeRegRange: "Registration Time：",
      merNum: "Merchant No.：",
      merNumId: "Merchant ID：",
      merName: "Merchant Name：",
      tel: "Phone No.：",
      telMerchant: "Merchant Mobile No.：",
      salesmanNameM: "Salesman Name：",
      salesman: "Sales Rep.：",
      sonMer: "Sub-Merchant No.：",
      auditStatus: "Audit State：",
      auditStatusD: "Please select Audit Status", //多项选择，单独处理--商户管理列表搜索栏
      salesmanNum: "Sales Rep. No.：",
      salesmanName: "Sales Rep. Name：",
      salesmanStatus: "State：",
      onJob: "Working",
      dimission: "On-leave",
      tradeNum: "Serial No.：",
      orderNum: "Order No.：",
      payStatus: "Payment State：",
      failure: " Failed",
      success: "Success",
      startTime: "Start：",
      endTime: "Ends：",
      tradePrice: "Amount：",
      tradeTime: "Time：",
      tradeStyle: "Type：",
      tradeStatus: "State：",
      tradeDes: "Description：",
      backout: "Canceled",
      refund: "Refunded",
      reverse: "Canceled (Abnormal Transaction)",
      orig_ssn: "Source Transaction ID:",
      legalName: "Legal Person Name:",
      logoutStatus: "Registration Status：",
      merch_style: "Merchant Type:",
      activeS: "Active",
      inactiveS: "Inactive",
      accountType: "到账类型：",
      ifChain: "是否为连锁店商户：",
      failureCause: "Reject Reason：",
      settleCardStatus: "结算卡更换信息状态：",
      loginName: "Login Account",
    },
    bodyBank: {
      qdNum: "Agent No.",
      qdName: "Agent Name",
      qdName2: "Agent Name",
      qdNameBelong: "Agent Name",
      qdShortName: "Abbreviation",
      qdStatus: "State",
      baseInfo: "Info",
      accountInfo: "Account",
      proInfo: "Add Values",
      regTime: "Reg. Time",
      open: "Enable",
      close: "Disable",
      closeDeactive: "Disable",
      merNum: "Merchant No.",
      merNumId: "Merchant ID",
      merName: "Merchant Name",
      merFee: "Fee Rate",
      ownerNname: "Owner Name",
      tel: "Phone No.",
      tel2: "Phone No.",
      auditStatus: "Audit State",
      failureCause: "Reject Reason",
      merStatus: "Merchant State",
      salesman: "Sales Rep.",
      salesmanNameM: "Salesman Name",
      sonMer: "Sub-Merchant No.",
      active: "Active",
      deactive: "Deactive",
      activeS: "Active",
      inactiveS: "Inactive",
      salesmanNum: "Sales Rep. No.",
      salesmanName: "Sales Rep. Name",
      salesmanStatus: "State",
      tradeNum: "Serial No.",
      orderNum: "Order No.",
      tradePrice: "Amount/",
      tradeTime: "Time",
      tradeStyle: "Type",
      tradeStatus: "State",
      tradeD: "Details",
      owner: "Onwer",
      telphone: "Phone No.",
      lastTradeTime: "Last Transaction",
      proNo: "Product No.",
      proName: "Product Name",
      proDes: "Product Introduction",
      proSel: "Select Add Value Product",
      getMoneyName: "Payee’s Name",
      bankAccount: " Bank Account",
      headBank: "Bank Name",
      headBankSel: "Select Bank",
      bankName: "Branch",
      settleStyle: "Payout Type",
      settleMothod: "Payout Method",
      startMoney: "Min Payout Amount",
      wechartFee: "Wechat Fee Rate",
      zfbFee: "Alipay Fee Rate",
      qqFee: "QQ钱包成本费率", //no
      jdFee: "京东钱包成本费率", //no
      cardFee: "刷卡成本费率", //no
      defaultFee: "Default Fee Rate",
      qdType: "Agent Type",
      ownerId: " Agent ID",
      country: "Country",
      timeZone: "Time Zone",
      currency: "Currency",
      regEmail: "Email",
      authProvince: "Province",
      authCity: "City",
      authCity2: "授权城市",
      salesmanTel: "Sales Rep. Phone No.",
      province: "Province",
      city: "City",
      businessMan: "Business Contact",
      businessEmail: "Business Email",
      financialMan: "Finance Contact",
      financialEmail: "Finance Email",
      qdManager: "Agent Manager",
      qdManagerTel: "Manager Phone No.",
      serverManager: "Service Manger",
      serverManagerTel: "Manager Phone No.",
      companyLogo: "Company LOGO",
      companyIcon: "Company ICON",
      businessLicense: "Business License",
      openAccounts: "开户许可证", //no
      uploadFile: "Upload",
      qdAddr: "Agent Address",
      familyName: "Name",
      qdManagerName: "Agent Manager Name",
      serverManagerName: "Service Manager Name",
      orig_ssn: "Source Transaction ID",
      channel_relationships: "Agents",
      qdLevel: "Agent Level",
      channel_sn: "Third Party Order No.",
      telMerchant: "Merchant Mobile No.",
      merch_style: "Merchant Type",
      logoutStatus: "Registration Status",
      loginName: "Login Account",
      frozen: "冻结",
      unfrozen: "取消冻结",
      shopName: "Merchant Name",
      shopName1: "店铺名称",
      loginName: "Login Account"
    }
  },
  home: {
    titleBank: {
      title: "Data Yesterday"
    },
    dataBank: {
      tradeData: "Amount",
      newNum: "New Merchants",
      income: "Net Income"
    },
    lineBank: {
      tradeLine: "Realtime Transactions",
      merchantLine: "New Merchants",
      trade_x: "Min/HH:MM",
      trade_y: "Amount/",
      trade_d: "Amount Statistic",
      merchant_x: "In a Week/MM",
      merchant_y: "Merchants/Date",
      merchant_d: "Merchants"
    }
  },
  noticeList: {
    bodyBank: {
      createTime: "Create Time",
      stick: "Top",
      delete: "Delete",
      Detail: "Announcement Detail",
      ifDel: "Confirm to delete the announcement?"
    }
  },
  channelList: {
    titleBank: {
      title: "Agent Info"
    },
    searchBank: {
      download: "Download"
    },
    bodyBank: {
      tipS: "Are you sure you want to",
      tipE: "the agent",
      proSuccess: "Success!",
      fixSuccess: "Success!"
    }
  },
  merchantlList: {
    titleBank: {
      title: "Merchant Info",
      sonTitle: "Shop List"
    },
    searchBank: {
      download: "Download",
      operateTime: "Last Modify Time",
      operateStyle: "Style",
      operateStatus: "Status",
      mendMuch: "Batch Modify",
      createMuch: "Batch Create",
      downId:'Download inital account',
      chanId: "Group ID",
      qdId: "Agent ID",
      status: "Status",
      closed: "Closed",
      opend: "Opened",
      search: "Enquiry",
      download: "Download",
      reset: "Reset",
      addChain: "New Group",
      addShops: "Batch Create Stores",
      mendShops: "Batch Modify Stores",
      bindShops: "Store Bind/Unbind",
      storeId: "Store ID"
    },
    bodyBank: {
      feeD: "Fee Rate Details",
      feeDetail: "Fee Rate Details",
      feeWeixin: "Wechat",
      feeBao: "Alipay",
      feeJd: "JD Pay",
      feeQQ: "QQ Pay",
      feeCard: "Credit Card",
      settleCycle: "Payout Cycle",
      tipS: "Are you sure you want to",
      tipE: "the merchant",
      merch_detail: " Merchant Details",
      baseInfo: "Basic Info",
      bankInfo: "Bank Account Details",
      shopInfo: "Shop Info",
      merch_style: "Merchant Type",
      mobile: "Phone No.:",
      signed_entity: "Legal Entity:",
      legal_name: "Representative:",
      legal_idnumber: "ID No.:",
      province: "Province/State:",
      city: "City:",
      accountname: "Account Name:",
      headbankname: "Bank:",
      bankname: "Branch:",
      bankaccount: "Bank Account:",
      banktype: " Account Type:",
      bank_mobile: "Phone No. with Bank:",
      bankstatus: "Bank Account Status:",
      receiptname: "Receipt Title:",
      mcc: "MCC:",
      address: "Address:",
      bank_city: "Bank City:",
      getMoneyBank: "Payout Bank:",
      bankAccountName: "Account No.:",
      bankOwnerName: "Account Name:",
      cardType: "Account Type:",
      settleType: "Settlement Type:",
      noMend: "银行卡已在审核中，请耐心等待",
      filename: "File Name",
      detail: "detail",
      selMerchant: "请选择待下载商户",
      feePercent: "MDR",
      view: "View",
      addshop: "Add Branch",
      shopList: "Branch List",
      detail: "Detail",
      upFirst:"请先上传文件！",
      upSuccess:"Success",
      bind: "Bind",
      unbind: "Unbind",
      mendTip1:"Download modify template",
      mendTip2:"Re-upload the file after changes are done. Only change infos you want to modify",
      mendTip3:"Up to 500 pieces of store information can be uploaded at a time",
      mendTip4:"Upload File",
      addTip1:"Download the template first",
      addTip2:"Re-upload when finished",
      addTip3:"Up to 500 entries can be uploaded at each time in one file. The file format must be .xls",
      company:"Company Info",
      bank:"Bank Info",
      product:"Product Info",
      brand:"Brand Name",
      companyName:"Company Name",
      merStyle:"Merchant Category Code",
      salName:"Referral code",
      contactName:"Contact Number",
      contactEmail:"Contact Email",
      bankNameGet:"Bank Name",
      branchBank:"Branch Bank",
      bankNameAccount:"Account",
      bankNameAccount1:"Account Name",
      bankCode:"Bank Account No./IBAN No.",
      bankNum:"Swift Code",
      rules:"HK Settlemen Rules",
      addSuce:"Success"
    }
  },
  salesmanlList: {
    titleBank: {
      title: "Sales Rep. Info"
    },
    searchBank: {
      download: "Download"
    },
    bodyBank: {
      businessStatistics: "Statistic",
      month: "Month",
      merchantNum: "Merchants",
      auditSucess: "Pass",
      auditError: "Failed ",
      auditReject: "Rejected ",
      tradeMoney: "Amount ",
      inactive: "Disable",
      removal: "Merchant Immigrate to",
      total: "Total",
      unitGe: ""
    }
  },
  tradelList: {
    titleBank: {
      title: "Transactions"
    },
    searchBank: {
      download: "Download"
    },
    bodyBank: {}
  },
  tradelDetail: {
    titleBank: {
      title: "Details"
    }
  },
  formMerchantin: {
    titleBank: {
      title: "New Merchant Statistic"
    },
    bodyBank: {
      selTime: "Start (Ends in One Week)",
      timePlace: "Select Date",
      lastWeek: "Recent Week/MM",
      merInNum: "New Merchants"
    }
  },
  formMer: {
    titleBank: {
      title: "Merchant Transactions"
    },
    bodyBank: {
      lineD: "Amount",
      lineY: "Amount/",
      lineX: "Time/hr"
    }
  },
  chanelIn: {
    titleBank: {
      title: "New Merchant Statistic"
    },
    bodyBank: {
      selTime: "Start (Ends in One Week)",
      timePlace: "Select Date",
      lineY: "New Merchants",
      lineX: "Recent One Week/Day",
      desDate: "Date",
      desChannel: "Sub-Agent on board New Merchants",
      desChannelNum: "Sub-Agents",
      unitPerson: "",
      unitGe: ""
    }
  },
  forChanelTrade: {
    titleBank: {
      title: "Agent Statistic"
    },
    bodyBank: {
      lineY: "Amount/",
      lineX: "Time/hr",
      desDate: "Date",
      desChannel: " Sub-Agent transaction amount",
      desChannelNum: "Sub-Agents",
      unitGe: ""
    }
  },
  forSalesman: {
    titleBank: {
      title: "Sales Rep. Statistic"
    },
    bodyBank: {
      lineY: "New Merchant/Person",
      lineX: "Time/Day",
      desDate: "Date",
      desChannel: "Sales Rep. on board New Merchant",
      desChannelNum: "Sales Rep. No",
      unitPerson: "",
      unitGe: ""
    }
  },
  forLost: {
    titleBank: {
      title: "Merchant Loss Statistic"
    },
    bodyBank: {}
  },
  forNocard: {
    titleBank: {
      title: "设置商户默认费率"
    },
    bodyBank: {}
  },
  ...enLocale
};