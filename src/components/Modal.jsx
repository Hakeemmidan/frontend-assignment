import React, { useContext } from 'react';
import styled from 'styled-components';
import { AppContext } from '../contexts/AppContext';


const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10;
`;

const ModalChild = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  min-width: 200px;
  min-height: 200px;
  background-color: white;
`;

export const Modal = () => {
  const { modal, setModal } = useContext(AppContext);

  const handleCloseModal = (e) => {
    e.stopPropagation();
    setModal({ isOpen: false, component: null });
  };

  if (!modal.isOpen) return null;

  return (
    <ModalBackground data-testid='modal_background' className="modal-background" onClick={handleCloseModal}>
      <ModalChild data-testid='modal_child' className="modal-child" onClick={(e) => e.stopPropagation()}>
        {modal.component}
      </ModalChild>
    </ModalBackground>
  );
};
