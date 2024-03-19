import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { useEffect, useState } from "react";
import { BsFiletypeDocx, BsFiletypePdf } from "react-icons/bs";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import CreateNewAttachment from "./CreateNewAttachment";
import { getFileSizeAndLabel } from "../../utils/Shared/FileSizeAndLable";
import { formatDate } from "../../utils/Shared/DateTransform";
import { getAttachments } from "../../redux-saga/modules/attachment/action";

interface Props {
  accountId: number;
  getAttachmentsCount: (data: number) => void;
}

const Attachments = ({ accountId, getAttachmentsCount }: Props) => {
  // getAttachmentsCount,
  const dispatch = useDispatch();
  const fetchedAttachments = useSelector((state: any) => state.attachmentReducer.attachments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const accountOwner = useSelector(
    (state: any) => state.accountReducer.accountOwner
  );

  let filteredAttachments = fetchedAttachments;
  if (accountId) {
    filteredAttachments = fetchedAttachments?.filter((attachment: any) => attachment.accountID === accountId);
  }
  const attachmentsCount = filteredAttachments.length;

  function getOwnerName(ownerId: string): string {
    const owner = accountOwner?.find((owner: any) => owner.id === ownerId);
    return owner ? owner.label : "";
  }

  useEffect(() => {
    dispatch(getAttachments());
  }, [dispatch]);

  useEffect(() => {
    getAttachmentsCount(attachmentsCount);
  });

  console.log("filteredAttachments:", filteredAttachments);

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };


  // let Attachments = fetchedAttachments;
  // if (accountOwner) {
  //   Attachments = fetchedAttachments?.filter((attachment: any) => attachment.accountOwner === accountOwner);
  // }
  // const attachmentCount = Attachments?.length; // Calculate attachmentCount based on filtered Attachments

  // console.log(Attachments);
  // useEffect(() => {
  //   if (accountOwner) {
  //     dispatch(getAttachments(accountOwner)); // Dispatch getAttachments with accountOwner
  //   } else {
  //     dispatch(getAttachments()); // Dispatch getAttachments without accountOwner
  //   }
  // }, [accountOwner, dispatch]); // Add accountOwner to the dependencies array

  // useEffect(() => {
  //   // Optionally, you can use attachmentCount here if needed
  //   console.log(attachmentCount);
  // }, [attachmentCount]); // Add attachmentCount to the dependencies array



  return (
    <CRow>
      <CCol xs={12}>
        <CreateNewAttachment
          isVisible={isModalVisible}
          handleClose={handleModalClose}
        />
        <CCard>
          <CCardHeader className="mb-3">
            {/* <CRow className="align-items-center"> */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-0">Attachments</h5>
              </div>
              <div className="text-end">
                <CButton
                  component="input"
                  type="button"
                  color="primary"
                  value="Add Attachment"
                  style={{ cursor: "pointer" }}
                  onClick={handleModalOpen}
                // variant="outline"
                />
              </div>
            </div>
            {/* </CRow> */}
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">File Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Attached By</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Date Added</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Size</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {filteredAttachments ? (
                  filteredAttachments.map((attachment: any) => (
                    <CTableRow>
                      <CTableHeaderCell>
                        {attachment.fileExtension === ".pdf" ? (
                          <BsFiletypePdf className="pdf" />
                        ) : (
                          <BsFiletypeDocx className="doc" />
                        )}
                        <CButton className="link" color="link">
                          {attachment.fileName}
                        </CButton>
                      </CTableHeaderCell>
                      <CTableDataCell>
                        {getOwnerName(attachment.userID)}
                      </CTableDataCell>
                      <CTableDataCell>
                        {formatDate(attachment.dateAdded, 'DD/MM/YYYY HH:mm')}
                      </CTableDataCell>
                      <CTableDataCell>
                        {getFileSizeAndLabel(attachment.fileSize)}
                      </CTableDataCell>
                    </CTableRow>
                  ))
                ) : (
                  <div>No Attachment Available</div>
                )}
                <CTableRow>
                  <CTableHeaderCell>
                    <MdOutlinePictureAsPdf className="pdf" />
                    <CButton className="link" color="link">
                      Learner Settings Page-February 2024.pdf
                    </CButton>
                  </CTableHeaderCell>
                  <CTableDataCell>Gourav Rai</CTableDataCell>
                  <CTableDataCell>22/02/2024 06:50PM</CTableDataCell>
                  <CTableDataCell>35kb</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Attachments;