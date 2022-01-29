import { getUrl } from "../utility"
import * as storage from "../asset/utils/asyncStore"
import * as constant from "../constants/keys"
import { UserTokenDTO } from "../model"
import { commonQueryParam } from "../redux/actions/actions"

export const configuredUrl = (url) => {
    return getUrl(url).protocol + getUrl(url).host
}

// export let baseUrl                  = "https://demo.effitrac.com/13"

export let baseUrl = null

// This is the way to config the baseUrl otherwise it does no set 
export const loadingBaseUrlSharedPreference = (async () => {
    try {
        await storage.getData(constant.keyIsBaseUrl).then(localBaseUrl => { baseUrl = localBaseUrl })
    } catch (error) {
        alert("Error catched from api.js", error)
    }
})()


export const getMultipleLedgers = "/erp/rest/accounts/ledger/getMultipleLedgers"

export const retrieveSegement = "/erp/rest/common/retrieveSegement"
export const onChangeSegment = "/erp/rest/common/onChangeSegment"

export const chartview = "/erp/rest/crm/crmLeads/chartview"
export const getCrmStatusOrderList = "/erp/rest/crm/commonData/getCrmStatusOrderList"
export const retrieveTierId = "/erp/rest/crm/crmLeads/retrieveTierId"

export const gstSummaryList = "/erp/rest/gstDashboard/gstSummaryList"
export const productCreate = "/erp/rest/product/create/"

export const checkConfig = "/erp/rest/login/checkConfig"
export const validateUser = "/erp/rest/login/validateUser"
export const forgetPassword = "/erp/rest/login/forgetPassword"
export const userSignUp = "/erp/rest/login/userSignUp"
export const isGSTRegistered = "/erp/rest/login/isGSTRegistered"
export const registerGST = "/erp/rest/login/registerGST"
export const changePassword = "/erp/rest/login/changePassword"

export const gstinMasterList = "/erp/rest/invoice/commonData/gstinMasterList"
export const gstinData = "/erp/rest/invoice/commonData/gstinData"
export const getForeignCurrency = "/erp/rest/invoice/commonData/getForeignCurrency"
export const configProperties = "/erp/rest/invoice/commonData/configProperties"
export const getPaymentTermList = "/erp/rest/invoice/commonData/getPaymentTermList"
export const getOrgAddress = "/erp/rest/invoice/commonData/getOrgAddress"
export const getFiscalYear = "/erp/rest/invoice/commonData/getFiscalYear"
export const participants = "/erp/rest/invoice/commonData/participants"
export const getFiscalYearList = "/erp/rest/invoice/commonData/getFiscalYearList"
export const getCrmStatusList = "/erp/rest/invoice/commonData/getCrmStatusList"
export const inventoryOnHandQty = "/erp/rest/invoice/commonData/inventoryOnHandQty"
export const productWoInventory = "/erp/rest/invoice/commonData/productWoInventory"
export const getOneTimeConstants = "/erp/rest/invoice/commonData/getOneTimeConstants"
export const fromAccount = "/erp/rest/invoice/commonData/fromAccount"
export const usersData = "/erp/rest/invoice/commonData/usersData"
export const stocktakeId = "/erp/rest/invoice/commonData/stocktakeId"
export const gstinList = "/erp/rest/invoice/commonData/gstinList"
export const getToAccountDetails = "/erp/rest/invoice/commonData/getToAccountDetails"
export const getWbsName = "/erp/rest/invoice/commonData/getWbsName"
export const searchExpense = "/erp/rest/invoice/commonData/searchExpense"
export const configuration = "/erp/rest/invoice/commonData/configuration"
export const getDefaultStatusList = "/erp/rest/invoice/commonData/getDefaultStatusList"
export const updateStocktake = "/erp/rest/invoice/commonData/updateStocktake"
export const getAccountsOneTimeConstants = "/erp/rest/invoice/commonData/getAccountsOneTimeConstants"

export const invoiceSalesCreate = "/erp/rest/invoice/Invoice/Sales/Create"
export const cancelSalesInvoice = "/erp/rest/invoice/Invoice/Sales/cancelSalesInvoice"
export const updateSalesInvoice = "/erp/rest/invoice/Invoice/Sales/updateSalesInvoice"
export const searchSalesInvoice = "/erp/rest/invoice/Invoice/Sales/searchSalesInvoice"
export const viewSalesInvoice = "/erp/rest/invoice/Invoice/Sales/viewSalesInvoice"
export const salesCreateBulk = "/erp/rest/invoice/Invoice/Sales/CreateBulk"
export const updateSequenceInvoice = "/erp/rest/invoice/Invoice/Sales/updateSequenceInvoice"

export const accountGroup = "/erp/rest/invoice/gl/account/group"
export const glAccounts = "/erp/rest/invoice/gl/accounts"

export const participantCreate = "/erp/rest/invoice/Participant/Create"
export const participantCreateBulk = "/erp/rest/invoice/Participant/CreateBulk"

export const generateRefNoforMobile = "/erp/rest/invoice/generateRefNoforMobile"
export const createPurchaseOrder = "/erp/rest/invoice/createPurchaseOrder"

export const recordExpense = "/erp/rest/invoice/expense/recordExpense"
export const cancelExpense = "/erp/rest/invoice/expense/cancelExpense"
export const retrieveExpense = "/erp/rest/invoice/expense/retrieveExpense"
export const retrieveServiceRequestById = "/erp/rest/invoice/expense/retrieveServiceRequestById"

export const createService = "/erp/rest/invoice/serviceRequest/createService"
export const updateServiceRequest = "/erp/rest/invoice/serviceRequest/updateServiceRequest"
export const searchRequest = "/erp/rest/invoice/serviceRequest/searchRequest"

export const receivePayment = "/erp/rest/invoice/accounts/receivePayment"
export const makePayment = "/erp/rest/invoice/accounts/makePayment"
export const recieveCheque = "/erp/rest/invoice/accounts/recieveCheque"
export const retrieveBalanceSheet = "/erp/rest/invoice/accounts/retrieveBalanceSheet"
export const retrieveProfitAndLoss = "/erp/rest/invoice/accounts/retrieveProfitAndLoss"
export const getTrialBalance = "/erp/rest/invoice/accounts/getTrialBalance"
export const retrieveCashFlowStatement = "/erp/rest/invoice/accounts/retrieveCashFlowStatement"














