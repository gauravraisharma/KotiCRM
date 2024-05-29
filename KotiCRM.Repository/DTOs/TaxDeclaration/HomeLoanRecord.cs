using System;
using System.ComponentModel.DataAnnotations;

public class HomeLoanRecordDTO
{
  
    public int Id { get; set; }


    public string LenderName { get; set; }

  
 
    public string LenderAddress { get; set; }

   
    public string LenderPanNumber { get; set; }

    public decimal Amount { get; set; }


    public string ProofDocumentLink { get; set; }


    public bool IsVerified { get; set; }


    public string Remarks { get; set; }
}
