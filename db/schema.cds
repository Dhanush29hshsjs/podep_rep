namespace demo;

entity Newtab
{
    key Ref_PO_No : Integer;
    PO_No : String(20);
    Customer_Name : String(50);
    Date : String(11);
    Modified_Date_Time : String(25);
    PO_File : String(100);
    @mandatory po_number : String(20);
    @mandatory po_date : String(11);
    @mandatory delivery_date : String(11);
    delivery_address : String(500);
    bill_to_address : String(100);
    customer : String(100);
    @mandatory currency : String(5);
    purchase_group : String(100);
    taxable_amount : Integer;
    amount_total : String(30);
    tax : Integer;
    @mandatory company_code : String(10);
    @mandatory plant : String(100);
    file_link : LargeString;
    // newtodata : Composition of many podatatab on newtodata.data = $self;
    newtoitem : Composition of many po_data_item on newtoitem.podataN = $self;
}
entity Draft
{
    key Ref_PO_No : Integer;
    PO_No : String;
    Customer_Name : String(50);
    Date : String(11);
    Modified_by : String(50);
    Modified_Date_Time : String(25);
    PO_File : String(100);

    @mandatory po_number : String(20);
    @mandatory po_date : String(11);
    @mandatory delivery_date : String(11);
    delivery_address : String(500);
    bill_to_address : String(100);
    customer : String(100);
    @mandatory currency : String(5);
    purchase_group : String(100);
    taxable_amount : Integer;
    amount_total : String(30);
    tax : Integer;
    @mandatory company_code : String(10);
    @mandatory plant : String(100);
    file_link : LargeString;
    // drafttodata : Composition of many  podatatab on drafttodata.data1 = $self;
    drafttoitem : Composition of many  po_data_itemD on drafttoitem.podataD = $self;
}

entity Submitted
{
    key Ref_PO_No : Integer;
    PO_No : String;
    Customer_Name : String(50);
    Date : String(11);
    Modified_Date_Time : String(25);
    PO_File : String(100);

    @mandatory po_number : String(20);
    @mandatory po_date : String(11);
    @mandatory delivery_date : String(11);
    delivery_address : String(500);
    bill_to_address : String(100);
    customer : String(100);
    @mandatory currency : String(5);
    purchase_group : String(100);
    taxable_amount : Integer;
    amount_total : String(30);
    tax : Integer;
    @mandatory company_code : String(10);
    @mandatory plant : String(100);
    file_link : LargeString;
    // submittedtodata : Composition of many  podatatab on submittedtodata.data2 = $self;
    submittedtoitem : Composition of many  po_data_itemS on submittedtoitem.podataS = $self;
}
// entity podatatab
// {
//     key uid:UUID;
//     key ref_po_no : Integer;
   
//     data : Association to one Newtab on data.Ref_PO_No = ref_po_no;
//     data1 : Association to one Draft on data1.Ref_PO_No = ref_po_no;
//     data2 : Association to one Submitted on data2.Ref_PO_No = ref_po_no;
// }
entity po_data_item{
    key uid:UUID;
    slno:Integer;
     ref_po_no:Integer;
     item_no:String(10);
     hsn_code:String(10);
     material_no:String(10);
     material_name:String(60);
     quantity:Integer;
     unit_price:String(20);
     unit_of_measure:String(5);
     tax_percentage:Integer;
     taxable_amount:String(15);
     tax_amount:String(15);
     total_amount:String(15);
     podataN : Association to one Newtab on podataN.Ref_PO_No = ref_po_no;
    //  podataD : Association to one Draft on podataD.Ref_PO_No = ref_po_no;
    //  podataS : Association to one Submitted on podataS.Ref_PO_No = ref_po_no;
     
}
entity po_data_itemD{
    key uid:UUID;
    slno:Integer;
     ref_po_no:Integer;
     item_no:String(10);
     hsn_code:String(10);
     material_no:String(10);
     material_name:String(60);
     quantity:Integer;
     unit_price:String(20);
     unit_of_measure:String(5);
     tax_percentage:Integer;
     taxable_amount:String(15);
     tax_amount:String(15);
     total_amount:String(15);
    //  podataN : Association to one Newtab on podataN.Ref_PO_No = ref_po_no;
     podataD : Association to one Draft on podataD.Ref_PO_No = ref_po_no;
    //  podataS : Association to one Submitted on podataS.Ref_PO_No = ref_po_no;
     
}
entity po_data_itemS{
    key uid:UUID;
    slno:Integer;
     ref_po_no:Integer;
     item_no:String(10);
     hsn_code:String(10);
     material_no:String(10);
     material_name:String(60);
     quantity:Integer;
     unit_price:String(20);
     unit_of_measure:String(5);
     tax_percentage:Integer;
     taxable_amount:String(15);
     tax_amount:String(15);
     total_amount:String(15);
    //  podataN : Association to one Newtab on podataN.Ref_PO_No = ref_po_no;
    //  podataD : Association to one Draft on podataD.Ref_PO_No = ref_po_no;
     podataS : Association to one Submitted on podataS.Ref_PO_No = ref_po_no;
     
}

entity Currency{
    code : String(10);
    description : String(50);
}

entity Plant{
    code : String(10);
    description : String(50);
}

entity CompanyCode{
    code : String(10);
    description : String(50);    
}

entity Track_po
{
    ref_po_no : Integer;
    error_log : String(20);
    modified_by : String(30);
    Date : String(11);
    po_number : String;
    status : String(10);
    supplier_name : String(20);
}

entity email
{
    key msg_id : String;
    FROM_ : String;
    DATE : Date;
    TIME : Time;
    SUBJECT : String;
    TIME_TAKEN : String;
    isReaded : String;
    ass1 : Association to many attachment on ass1.email = $self;
    ass2 : Association to many invoice_No on ass2.email = $self;
}

entity attachment
{
    key id : UUID;
    msg_id : String;
    attachmentId : LargeString;
    filename : String;
    email : Association to one email on email.msg_id = msg_id;
}

entity invoice_No
{
    key id : UUID;
    msg_id : String;
    invoice_no : String;
    email : Association to one email on email.msg_id = msg_id;
}
