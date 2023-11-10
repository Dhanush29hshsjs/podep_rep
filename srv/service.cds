using {demo} from '../db/schema';
service CatalogService
{
    @odata.draft.enabled
    entity Newtab as
        projection on demo.Newtab;

    @odata.draft.enabled
    entity Draft as
        projection on demo.Draft;
    
    @odata.draft.enabled
    entity Submitted as
        projection on demo.Submitted;

    entity Currency as
        projection on demo.Currency;

     entity CompanyCode as
        projection on demo.CompanyCode;
    
    entity Plant as
        projection on demo.Plant;
    // entity podatatab as
    //     projection on demo.podatatab;
        
    entity po_data_item as
        projection on demo.po_data_item;

    entity po_data_itemD as
        projection on demo.po_data_itemD;

    entity po_data_itemS as
        projection on demo.po_data_itemS;

     entity Track_po as
        projection on demo.Track_po;

    entity email as
        projection on demo.email actions{
              @(  cds.odata.bindingparameter.name : '_it',
            Common.SideEffects              : {TargetProperties : ['_it/isReaded']} ,
            
              )action buttomaction() ;
               @Core.OperationAvailable : { $edmJson: { $Eq: [{ $Path: '_it/bool'},false]}}
                 action buttomaction1();       
            
            };

    entity attachment as
        projection on demo.attachment;

    entity invoice_No as
        projection on demo.invoice_No;    

        function getPdfUrl() returns LargeString;
        function getPdfUrlD() returns LargeString;
        function getPdfUrlS() returns LargeString;
        
}