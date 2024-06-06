// shared/CroppingModal.tsx
import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { CModal, CModalBody, CModalFooter, CModalHeader, CButton } from '@coreui/react';

interface CroppingModalProps {
  image: string | null;
  visible: boolean;
  onClose: () => void;
  onCrop: (croppedImage: string) => void;
}

const CropImage = ({ image, visible, onClose, onCrop }: CroppingModalProps) => {
  const cropperRef = useRef<HTMLImageElement & { cropper: Cropper }>(null);

  const handleCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedImageDataURL = cropper.getCroppedCanvas().toDataURL();
      onCrop(croppedImageDataURL);
    }
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader closeButton onClose={onClose}>Crop Image</CModalHeader>
      <CModalBody>
        {image && (
          <Cropper
            src={image}
            style={{ height: 400, width: '100%' }}
            initialAspectRatio={1}
            aspectRatio={1}
            guides={false}
            ref={cropperRef}
          />
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleCrop}>Crop Image</CButton>{' '}
        <CButton color="secondary" onClick={onClose}>Cancel</CButton>
      </CModalFooter>
    </CModal>
  );
};

export default CropImage;
