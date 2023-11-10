const cds = require('@sap/cds');
// const { sap } = require('sap/ui/core');
////my function
// function convertDateFormat(inputDate) {
//     // Extract the "DD-MM-YYYY", "DD.MM.YYYY", or "DD/MM/YYYY" part from the input string
//     var extractedDate = inputDate.match(/\d{2}[-./]\d{2}[-./]\d{4}/)[0];

//     // Replace different delimiters with "-"
//     var formattedDate = extractedDate.replace(/[-./]/g, '-');
//     var parts = formattedDate.split('-');
    
//     // Rearrange the components to YYYY-MM-DD format
//     var outputDate = parts[2] + '-' + parts[1] + '-' + parts[0];
//     return outputDate;
// }
// function convertDateTimeFormat(inputDate) {
//     // Extract date and time components
//     var parts = inputDate.split(/[ /-:]/);
    
//     // Rearrange the components to YYYY-MM-DD HH:MM:SS format
//     var outputDate = parts[2] + '-' + parts[0] + '-' + parts[1] +
//                      ' ' + (parts[3] || '00') + ':' + (parts[4] || '00') + ':' + (parts[5] || '00');
    
//     return outputDate;
// }
///end of my fun

module.exports = cds.service.impl(async function () {
    /* SERVICE ENTITIES */
    let {
        Source_Event,
        Source_Event_Name,
        NoKey,
        Newtab,
        po_data,
        po_data_item,
        po_data_itemD,
        po_data_itemS,
        Submitted,
        Draft,
        Currency,
        CompanyCode,
        Plant,
        Track_po,
        email,
        invoice_No,
        attachment,
        podatatab
    } = this.entities;
    var pagee = 1;
    // const c4re = await cds.connect.to('iflow');
    const c5re = await cds.connect.to('iflow1');
    var firstRead = true;
    // this.on('buttomaction1', async (req) => {
    //     // sap.m.MessageToast.show('Button Action 1 was triggered.');
    // });
    this.on('buttomaction1', async (req) => {
        // sap.m.MessageToast.show('Button Action 1 was triggered.');
        
        // Call the second function here
        // await processEmailData(req);
    });
    
   
    
    this.on('buttomaction', async (req) => {
        var msgid = req.params[0].msg_id;
        // console.log("button hit aytu");
        var bodyy = {};
        var res = await c5re.post(`/dev/gmail-s3?user_id=einvoiceportal@gmail.com&msg_id=${msgid}`, bodyy);
    });
    // this.on('next', async (req) => {
    //     pagee = req.params[0].msg_id;
    //     console.log("next hit aytu");
       
    // });
    // this.on('prev', async (req) => {
    //     var msgid = req.params[0].msg_id;
    //     // console.log("button hit aytu");
    //     var bodyy = {};
    //     var res = await c5re.post(`/dev/gmail-s3?user_id=einvoiceportal@gmail.com&msg_id=${msgid}`, bodyy);
    // });
    this.on('getPdfUrl', async (req) => {debugger
        const fileLinkValue = await SELECT `file_link`.from(Newtab);
        return fileLinkValue;
      });
      this.on('getPdfUrlD', async (req) => {debugger
        const fileLinkValue = await SELECT `file_link`.from(Draft);
        return fileLinkValue;
      });
      this.on('getPdfUrlS', async (req) => {debugger
        const fileLinkValue = await SELECT `file_link`.from(Submitted);
        return fileLinkValue;
      });
 /* SERVICE HANDLERS */
 this.before('READ', Newtab, async (req ) => {debugger
    try {debugger
        var er = false;
        
            if (req.params[0].Ref_PO_No != null) {debugger
                cds.tx(req).run(DELETE(Newtab));
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                const pono = req.params[0].Ref_PO_No;
                const link = `/dev/getpo?po_no=${pono}`;
                const resp1 = await c5re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                debugger
                    entries1.push({
                     Ref_PO_No : `${spaces1.ref_po_no}`,
                     po_number : `${spaces1.po_number}` ||`NA`,
                     po_date : `${spaces1.po_date}`,
                     delivery_date : `${spaces1.delivery_date}`,
                     delivery_address : `${spaces1.delivery_address}`,
                     bill_to_address : `${spaces1.bill_to_address}`,
                     customer : `${spaces1.buyer}`,
                     currency : `${spaces1.currency}`,
                     purchase_group : `${spaces1.purchase_group}`,
                     taxable_amount : `${spaces1.taxable_amount}`,
                     amount_total : `${spaces1.total_amount}`,
                     tax : `${spaces1.tax_percentage}`,
                     company_code : `${spaces1.company_code}`,
                     plant : `${spaces1.plant}`,
                     file_link : `${spaces1.files.file_link}`
                    });
                // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));    
            
            }debugger
            
        // }
        var er = false;
        return req;
    } catch (err) {
        if (er) {
           req.error(500, err.message);
        }
        try {
            var er = false;
        
            if (req.query.SELECT.where[2].val != null) {debugger
                cds.tx(req).run(DELETE(Newtab));
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                const pono = req.query.SELECT.where[2].val;
                const link = `/dev/getpo?po_no=${pono}`;
                const resp1 = await c5re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                debugger
                    entries1.push({
                     Ref_PO_No : `${spaces1.ref_po_no}`,
                     po_number : `${spaces1.po_number}` ||`NA`,
                     po_date : `${spaces1.po_date}`,
                     delivery_date : `${spaces1.delivery_date}`,
                     delivery_address : `${spaces1.delivery_address}`,
                     bill_to_address : `${spaces1.bill_to_address}`,
                     customer : `${spaces1.buyer}`,
                     currency : `${spaces1.currency}`,
                     purchase_group : `${spaces1.purchase_group}`,
                     taxable_amount : `${spaces1.taxable_amount}`,
                     amount_total : `${spaces1.total_amount}`,
                     tax : `${spaces1.tax_percentage}`,
                     company_code : `${spaces1.company_code}`,
                     plant : `${spaces1.plant}`,
                     file_link : `${spaces1.files.file_link}`
                    });
                // await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));
                await cds.tx(req).run(INSERT.into(Newtab).entries(entries1));    
            
            }debugger
            
        // }
        var er = false;
        return req;
        } catch (error) {
            if (er) {
                req.error(500, err.message);
             }
             try{
                if (firstRead) {debugger
                    cds.tx(req).run(DELETE(Newtab));
                    
                    const resp = await c5re.get('/dev/getpo?pageno=1&nooflines=50&tabname=new');
                    const spaces = resp.body;
                    const entries = [];
                    spaces.forEach(space =>  {
                        entries.push({
                            PO_No : `${space.po_number}` || `NA`,
                            Ref_PO_No : `${space.ref_po_no}`,
                            Customer_Name : `${space.buyer}` || `NA`,
                            Date :`${space.po_date}` || `NA`,
                            Modified_Date_Time : `${space.modified_date}` || `NA`,
                            PO_File : `${space.file.length}` || `NA`
                        });
                    });
                    await cds.tx(req).run(INSERT.into(Newtab).entries(entries));
                }
                return req;
                
            }catch(err){
             req.error(500, err.message);
            }
        }



     

    }
});
 /* SERVICE HANDLERS */
 this.before('READ', Draft, async (req) => {
    try {
        var er = false;
       
            if (req.params[0].Ref_PO_No != null) {
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                    cds.tx(req).run(DELETE(Draft));
                const pono = req.params[0].Ref_PO_No;
                const link = `/dev/getpo?po_no=${pono}`;
                const resp1 = await c5re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                
                    entries1.push({
                     Ref_PO_No : `${spaces1.ref_po_no}`,
                     po_number : `${spaces1.po_number}` ||`NA`,
                     po_date : `${spaces1.po_date}`,
                     delivery_date : `${spaces1.delivery_date}`,
                     delivery_address : `${spaces1.delivery_address}`,
                     bill_to_address : `${spaces1.bill_to_address}`,
                     customer : `${spaces1.buyer}`,
                     currency : `${spaces1.currency}`,
                     purchase_group : `${spaces1.purchase_group}`,
                     taxable_amount : `${spaces1.taxable_amount}`,
                     amount_total : `${spaces1.total_amount}`,
                     tax : `${spaces1.tax_percentage}`,
                     company_code : `${spaces1.company_code}`,
                     plant : `${spaces1.plant}`,
                     file_link : `${spaces1.files.file_link}`
                    });
                await cds.tx(req).run(INSERT.into(Draft).entries(entries1));
            }
            // await cds.tx(req).run(INSERT.into(Draft).entries(entries));
        // }
        var er = false;
        return req;
    } catch (err) {
        if (er) {
           req.error(500, err.message);
        }

        try {
            var er = false;
       
            if (req.query.SELECT.where[2].val != null) {
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                    cds.tx(req).run(DELETE(Draft));
                const pono = req.query.SELECT.where[2].val;
                const link = `/dev/getpo?po_no=${pono}`;
                const resp1 = await c5re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                
                    entries1.push({
                     Ref_PO_No : `${spaces1.ref_po_no}`,
                     po_number : `${spaces1.po_number}` ||`NA`,
                     po_date : `${spaces1.po_date}`,
                     delivery_date : `${spaces1.delivery_date}`,
                     delivery_address : `${spaces1.delivery_address}`,
                     bill_to_address : `${spaces1.bill_to_address}`,
                     customer : `${spaces1.buyer}`,
                     currency : `${spaces1.currency}`,
                     purchase_group : `${spaces1.purchase_group}`,
                     taxable_amount : `${spaces1.taxable_amount}`,
                     amount_total : `${spaces1.total_amount}`,
                     tax : `${spaces1.tax_percentage}`,
                     company_code : `${spaces1.company_code}`,
                     plant : `${spaces1.plant}`,
                     file_link : `${spaces1.files.file_link}`
                    });
                await cds.tx(req).run(INSERT.into(Draft).entries(entries1));
            }
            // await cds.tx(req).run(INSERT.into(Draft).entries(entries));
        // }
        var er = false;
        return req;
        } catch (error) {
            if (er) {
                req.error(500, err.message);
             }   
             try{
                if (firstRead) {
                    cds.tx(req).run(DELETE(Draft));
                    
                    const resp = await c5re.get('/dev/getpo?pageno=1&nooflines=50&tabname=draft');
                    const spaces = resp.body;
                    const entries = [];
                    spaces.forEach(space =>  {
                        entries.push({
                            PO_No : `${space.po_number}` || `NA`,
                            Ref_PO_No : `${space.ref_po_no}`,
                            Customer_Name : `${space.buyer}` || `NA`,
                            Date :`${space.po_date}` || `NA`,
                            Modified_Date_Time : `${space.modified_date}` || `NA`,
                            PO_File : `${space.file.length}` || `NA`
                        });
                    });
                    await cds.tx(req).run(INSERT.into(Draft).entries(entries));
                }
                return req;
                
            }catch(err){
             req.error(500, err.message);
            }
        }

       

    }
});
 /* SERVICE HANDLERS */
 this.before('READ', Submitted, async (req) => {
    try {
        var er = false;
       
            if (req.params[0].Ref_PO_No != null) {
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                cds.tx(req).run(DELETE(Submitted));
                const pono = req.params[0].Ref_PO_No;
                const link = `/dev/getpo?po_no=${pono}`;
                const resp1 = await c5re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                
                    entries1.push({
                     Ref_PO_No : `${spaces1.ref_po_no}`,
                     po_number : `${spaces1.po_number}` ||`NA`,
                     po_date : `${spaces1.po_date}`,
                     delivery_date : `${spaces1.delivery_date}`,
                     delivery_address : `${spaces1.delivery_address}`,
                     bill_to_address : `${spaces1.bill_to_address}`,
                     customer : `${spaces1.buyer}`,
                     currency : `${spaces1.currency}`,
                     purchase_group : `${spaces1.purchase_group}`,
                     taxable_amount : `${spaces1.taxable_amount}`,
                     amount_total : `${spaces1.total_amount}`,
                     tax : `${spaces1.tax_percentage}`,
                     company_code : `${spaces1.company_code}`,
                     plant : `${spaces1.plant}`,
                     file_link : `${spaces1.files.file_link}`
                    });
                await cds.tx(req).run(INSERT.into(Submitted).entries(entries1));
            }
            // await cds.tx(req).run(INSERT.into(Submitted).entries(entries));
        // }
        var er = false;
        return req;
    } catch (err) {
        if (er) {
           req.error(500, err.message);
        }
        try {
            var er = false;
       
            if (req.query.SELECT.where[2].val != null) {
                var er = true;
                // cds.tx(req).run(DELETE(podatatab));
                cds.tx(req).run(DELETE(Submitted));
                const pono = req.query.SELECT.where[2].val;
                const link = `/dev/getpo?po_no=${pono}`;
                const resp1 = await c5re.post(link);
                const spaces1 = resp1.body;
                const entries1 = [];
                
                    entries1.push({
                     Ref_PO_No : `${spaces1.ref_po_no}`,
                     po_number : `${spaces1.po_number}` ||`NA`,
                     po_date : `${spaces1.po_date}`,
                     delivery_date : `${spaces1.delivery_date}`,
                     delivery_address : `${spaces1.delivery_address}`,
                     bill_to_address : `${spaces1.bill_to_address}`,
                     customer : `${spaces1.buyer}`,
                     currency : `${spaces1.currency}`,
                     purchase_group : `${spaces1.purchase_group}`,
                     taxable_amount : `${spaces1.taxable_amount}`,
                     amount_total : `${spaces1.total_amount}`,
                     tax : `${spaces1.tax_percentage}`,
                     company_code : `${spaces1.company_code}`,
                     plant : `${spaces1.plant}`,
                     file_link : `${spaces1.files.file_link}`
                    });
                await cds.tx(req).run(INSERT.into(Submitted).entries(entries1));
            }
            // await cds.tx(req).run(INSERT.into(Submitted).entries(entries));
        // }
        var er = false;
        return req;
        } catch (error) {
            if (er) {
                req.error(500, err.message);
             }
             try{
                if (firstRead) {
                    cds.tx(req).run(DELETE(Submitted));
                    
                    const resp = await c5re.get('/dev/getpo?pageno=1&nooflines=50&tabname=submitted');
                    const spaces = resp.body;
                    const entries = [];
                    spaces.forEach(space =>  {
                        entries.push({
                            PO_No : `${space.po_number}` || `NA`,
                            Ref_PO_No : `${space.ref_po_no}`,
                            Customer_Name : `${space.buyer}` || `NA`,
                            Date :`${space.po_date}` || `NA`,
                            Modified_Date_Time : `${space.modified_date}` || `NA`,
                            PO_File : `${space.file.length}` || `NA`
                        });
                    });
                    await cds.tx(req).run(INSERT.into(Submitted).entries(entries));
                }
                return req;
                
            }catch(err){
             req.error(500, err.message);
            }
        }

     

    }
});
////////////////////////////
// var firstRead = true;
// /* SERVICE HANDLERS */
// this.before('READ', podatatab, async (req) => {
//    try {
//     const pono = req.params[0].Ref_PO_No;
//        if (firstRead) {
//            cds.tx(req).run(DELETE(podatatab));
          
//            const resp = await c5re.post('/dev/getpo?po_no='+pono);
//            const `${spaces = resp.body;
//            const entries = [];
           
//                entries.push({
//                 ref_po_no : `${spaces.ref_po_no,
//                 po_number : `${spaces.po_number ||`NA`,
//                 po_date : `${spaces.po_date,
//                 delivery_date : `${spaces.delivery_date,
//                 delivery_address : `${spaces.delivery_address,
//                 bill_to_address : `${spaces.bill_to_address,
//                 customer : `${spaces.buyer,
//                 currency : `${spaces.currency,
//                 purchase_group : `${spaces.purchase_group,
//                 taxable_amount : `${spaces.taxable_amount,
//                 amount_total : `${spaces.total_amount,
//                 tax : `${spaces.tax_percentage,
//                 company_code : `${spaces.company_code,
//                 plant : `${spaces.plant
//                });
           
       
//            await cds.tx(req).run(INSERT.into(podatatab).entries(entries));
//        }
//        return req;
//    } catch (err) {
//        req.error(500, err.message);
//    }
// });
//////////////////////////
this.before('READ', po_data_item, async (req) => {debugger
    try {
        
            const poid = req.params[0].Ref_PO_No;
            // console.log(poid);
            const str = "/dev/getpo?po_no="+poid.toString()
            const resp = await c5re.post(str);
            // console.log("poid");
            // cds.tx(req).run(DELETE(po_data));
            cds.tx(req).run(DELETE(po_data_item));
            // const `${spaces = resp.content;
            // console.log(resp);
            // console.log("------------------------------");
            // console.log(resp.body);
            const spaces = resp.body;
            // const entries1 = [];
            const entries11 = [];
           
                const items = [{"material_no":"9","material_name":"MARA","taxable_amount":"10","ref_po_no":spaces.ref_po_no},{"ref_po_no":spaces.ref_po_no,"material_no":"19","material_name":"MARAa","taxable_amount":"11"}];//`${spaces.item;
                items.forEach(item =>  {    
                    entries11.push({
                    slno:1,
                    ref_po_no:item.ref_po_no,
                    item_no:"1",//item.item_no,
                    hsn_code:"1",//item.hsn_code,
                    material_no:item.material_no,
                    material_name:item.material_name,
                    quantity:2,//item.quantity,
                    unit_price:"1",//item.unit_price,
                    unit_of_measure:"1",//item.unit_of_measure,
                    tax_percentage:5,//item.tax_percentage,
                    taxable_amount:item.taxable_amount,
                    tax_amount:"1",//item.tax_amount,
                    total_amount:"1",//item.total_amount
                });
                }); 
            await cds.tx(req).run(INSERT.into(po_data_item).entries(entries11));
            // await cds.tx(req).run(INSERT.into(po_data).entries(entries1));
            
            // return `${spaces;
          //  firstRead = true;
        
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});
//////////////////////////
this.before('READ', po_data_itemD, async (req) => {debugger
    try {
        
            const poid = req.params[0].Ref_PO_No;
            // console.log(poid);
            const str = "/dev/getpo?po_no="+poid.toString()
            const resp = await c5re.post(str);
            // console.log("poid");
            // cds.tx(req).run(DELETE(po_data));
            cds.tx(req).run(DELETE(po_data_itemD));
            // const `${spaces = resp.content;
            // console.log(resp);
            // console.log("------------------------------");
            // console.log(resp.body);
            const spaces = resp.body;
            // const entries1 = [];
            const entries11 = [];
           
                const items = [{"material_no":"9","material_name":"MARA","taxable_amount":"10","ref_po_no":spaces.ref_po_no},{"ref_po_no":spaces.ref_po_no,"material_no":"19","material_name":"MARAa","taxable_amount":"11"}];//`${spaces.item;
                items.forEach(item =>  {    
                    entries11.push({
                    slno:1,
                    ref_po_no:item.ref_po_no,
                    item_no:"1",//item.item_no,
                    hsn_code:"1",//item.hsn_code,
                    material_no:item.material_no,
                    material_name:item.material_name,
                    quantity:2,//item.quantity,
                    unit_price:"1",//item.unit_price,
                    unit_of_measure:"1",//item.unit_of_measure,
                    tax_percentage:5,//item.tax_percentage,
                    taxable_amount:item.taxable_amount,
                    tax_amount:"1",//item.tax_amount,
                    total_amount:"1",//item.total_amount
                });
                }); 
            await cds.tx(req).run(INSERT.into(po_data_itemD).entries(entries11));
            // await cds.tx(req).run(INSERT.into(po_data).entries(entries1));
            
            // return `${spaces;
          //  firstRead = true;
        
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});
//////////////////////////
this.before('READ', po_data_itemS, async (req) => {debugger
    try {
        
            const poid = req.params[0].Ref_PO_No;
            // console.log(poid);
            const str = "/dev/getpo?po_no="+poid.toString()
            const resp = await c5re.post(str);
            // console.log("poid");
            // cds.tx(req).run(DELETE(po_data));
            cds.tx(req).run(DELETE(po_data_itemS));
            // const `${spaces = resp.content;
            // console.log(resp);
            // console.log("------------------------------");
            // console.log(resp.body);
            const spaces = resp.body;
            // const entries1 = [];
            const entries11 = [];
           
                const items = [{"material_no":"9","material_name":"MARA","taxable_amount":"10","ref_po_no":spaces.ref_po_no},{"ref_po_no":spaces.ref_po_no,"material_no":"19","material_name":"MARAa","taxable_amount":"11"}];//`${spaces.item;
                items.forEach(item =>  {    
                    entries11.push({
                    slno:1,
                    ref_po_no:item.ref_po_no,
                    item_no:"1",//item.item_no,
                    hsn_code:"1",//item.hsn_code,
                    material_no:item.material_no,
                    material_name:item.material_name,
                    quantity:2,//item.quantity,
                    unit_price:"1",//item.unit_price,
                    unit_of_measure:"1",//item.unit_of_measure,
                    tax_percentage:5,//item.tax_percentage,
                    taxable_amount:item.taxable_amount,
                    tax_amount:"1",//item.tax_amount,
                    total_amount:"1",//item.total_amount
                });
                }); 
            await cds.tx(req).run(INSERT.into(po_data_itemS).entries(entries11));
            // await cds.tx(req).run(INSERT.into(po_data).entries(entries1));
            
            // return `${spaces;
          //  firstRead = true;
        
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});
///////////Currency help
this.before('READ', Currency, async (req) => {debugger
try { if (true) {
    const resp = await c5re.get('/dev/search-help?master_id=12');
    cds.tx(req).run(DELETE(Currency));
    const spaces = resp.body.search_help;
    const entries = [];
    spaces.forEach(space =>  {        
        entries.push({
            code : `${space.code}`,
            description : `${space.description}`
        });
    });
    await cds.tx(req).run(INSERT.into(Currency).entries(entries));
    }
return req;
    
} catch (err) {
    req.error(500, err.message);
}
});   
///////////Currency help
this.before('READ', CompanyCode, async (req) => {
try { if (true) {
    const resp = await c5re.get('/dev/search-help?master_id=1');
    cds.tx(req).run(DELETE(CompanyCode));
    const spaces = resp.body.search_help;
    const entries = [];
    spaces.forEach(space =>  {        
        entries.push({
            code : `${space.code}`,
            description : `${space.description}`
        });
    });
    await cds.tx(req).run(INSERT.into(CompanyCode).entries(entries));
    }
return req;
    
} catch (err) {
    req.error(500, err.message);
}
});   
///////////Currency help
this.before('READ', Plant, async (req) => {
try { if (true) {
    const resp = await c5re.get('/dev/search-help?master_id=7');
    cds.tx(req).run(DELETE(Plant));
    const spaces = resp.body.search_help;
    const entries = [];
    spaces.forEach(space =>  {        
        entries.push({
            code : `${space.code}`,
            description : `${space.description}`
        });
    });
    await cds.tx(req).run(INSERT.into(Plant).entries(entries));
    }
return req;
    
} catch (err) {
    req.error(500, err.message);
}
});   
    /* SERVICE HANDLERS */
   this.before('READ', Track_po, async (req) => {
    try {
        if (firstRead) {
            const resp = await c5re.post('/dev/trackso?userid=einvoiceportal@gmail.com&pageno=1&nooflines=50');
            cds.tx(req).run(DELETE(Track_po));
            // const `${spaces = resp.content;
            const spaces = resp.body;
            const entries = [];
            spaces.forEach(space =>  {
                // var datee = convertDateFormat(`${space.po_date);
                // if (`${space.modified_date == null) {
                //     var dateTime = `${space.modified_date;
                // } else {
                //     var dateTime = convertDateTimeFormat(`${space.modified_date);
                // }
                
                entries.push({
                    // Srcevtname: `${space.Srcevtname,
                    // CreatedBy: `${space.CreatedBy,
                    po_number : `${space.po_number}` || `NA`,
                    ref_po_no : `${space.ref_po_no}`,
                    supplier_name : `${space.supplier_name}` || `NA`,
                    Date :`${space.po_date}`  || `NA`,
                    Modified_by:`${space.modified_by}` || `NA`,
                    //Date :convertDateFormat(datee),
                   // Modified_Date_Time : `${space.modified_date,
                    status: `${space.status}` || `NA`,
                    error_log: `${space.error_log}` || `NA`
                   // Version: `${space.Version,
                   // event_id: `${space.event_id,
                    // status: `${space.status
                });
            });
            await cds.tx(req).run(INSERT.into(Track_po).entries(entries));
            // return `${spaces;
            firstRead = true;
        }
        return req;
    } catch (err) {
        req.error(500, err.message);
    }
});
/////////////////

//   const c4re = await cds.connect.to('iflow');
var firstRead = true;

/* SERVICE HANDLERS */
this.before('READ', email, async (req) => {
    console.log("email hit aytu");
 try {
     if (firstRead) {
      var pgno = 1;
        cds.tx(req).run(DELETE(email));
         cds.tx(req).run(DELETE(attachment));
         cds.tx(req).run(DELETE(invoice_No));
        const entries = [];
        const entries1 = [];
        const entries2 = [];

         while(true){
                const resp = await c5re.get(`/dev/gmail-s3?user_id=einvoiceportal@gmail.com&user_id2=einvoiceportal@elipo.awsapps.com&pageno=${pgno}&condn=`);
                const spaces = resp.body;
                pgno ++;
                if(pgno == 6){
                    break;
                }
                
                spaces.forEach(space =>  {
                    
                    const dateTimeString = space.dateobj;
                    const dateTimeParts = dateTimeString.split(/[ +]/);
                    entries.push({
                        msg_id : `${space.msg_id}` || `NA`,
                        FROM_ : `${space.sender}` || `NA`,
                        DATE : `${dateTimeParts[0]}` || `NA`,
                        TIME : `${dateTimeParts[1]}` || `NA`,
                        SUBJECT : `${space.subject}` || `NA`,
                        TIME_TAKEN : `${space.time_taken}` || `NA`,
                        isReaded :`${space.isReaded}` || `NA`
                    });
                    const spaces1 = space.attachments;
                    spaces1.forEach(space1 =>  {
                        entries1.push({
                            msg_id : `${space1.msg_id}` || `NA`,
                            attachmentId : `${space1.attachmentId}` || `NA`,
                        filename : `${space1.filename}` || `NA`
                    });
                    });
                    var spaces2 = space.invoice_no ;
                    if(space.invoice_no.length == 0){
                        spaces2 = [`NA`];
                    }
                    spaces2.forEach(space2 =>  {
                        entries2.push({
                            msg_id : `${space.msg_id}` || `NA`, 
                         invoice_no : `${space2}` || `NA`
                    });
                    });      

                
                });
                }
                entries.sort((a, b) => {
                    // Parse the 'DATE' values into Date objects and compare them
                    const dateA = new Date(a.DATE);
                    const dateB = new Date(b.DATE);
                    const dateComparison = dateB - dateA;
                  
                    if (dateComparison === 0) {
                      // Parse the 'TIME' values into Date objects and compare them
                      const timeA = new Date(`1970-01-01T${a.TIME}`);
                      const timeB = new Date(`1970-01-01T${b.TIME}`);
                      return timeB - timeA;
                    }
                  
                    return dateComparison;
                  });
         await cds.tx(req).run(INSERT.into(email).entries(entries));
         await cds.tx(req).run(INSERT.into(attachment).entries(entries1));
         await cds.tx(req).run(INSERT.into(invoice_No).entries(entries2));
         // return `${spaces;
         firstRead = true;
     
     return req;
    }
    } catch (err) {
     req.error(500, err.message);
    }
});
});
