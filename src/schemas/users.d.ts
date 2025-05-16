interface checkCodeSchema {
	e_mail: string
}

type ApiCodeDataType = {
	message: string
	status: string
	code?: string
}

interface userRegisterSchema {
	name: string
	surname: string
	e_mail: string
	hash_password: string
}

type ApiTokenDataType = {
	access_token: string
}

interface userAuthorizeSchema {
	e_mail: string
	hash_password: string
}

interface userRetAuthSchema {
	name: string
	surname: string
}

type ApiAuthDataType = {
	message: string
	status: string
	code?: userRetAuthSchema
}

interface userProfileSchema {
	name: string
	surname: string
}

interface userEditSchema {
	name: string
	surname: string
	e_mail: string
}

interface userTokenSchema {
	access_token: string
	token_type: string
}





interface product {
	article: string
	imageUrl: string
	name: string
}

interface supplier {
	supplierId: string
	name: string
	supplierImageUrl: string
	supplierProductUrl: string
	rating: number
	years: number
	price: string
	minOrder: string
	status: string
}

interface blackListSupplier {
	supplierId: string
	status: string
	name: string
	comment: string
}

type ProductTypeSchema = product[]

type SupplierTypeSchema = supplier[]

type BlackListSupplierTypeSchema = blackListSupplier[]

type ApiProductDataType = {
	message: string
	status: string
	product?: product[]
}

type ApiSupplierDataType = {
	message: string
	status: string
	supplier?: blackListSupplier[]
}