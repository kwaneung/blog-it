import { Button } from './ui/button';

interface IFormProps {
  onClose: () => void; // Form 컴포넌트 닫기 함수
  onSaveTo: string; // 글을 저장할 곳
}

const Form = ({ onClose, onSaveTo }: IFormProps) => {
  return (
    <>
      <div>Form!!</div>
      <div>This Form save to {onSaveTo}</div>
      <Button onClick={onClose}>test Button</Button>
    </>
  );
};

export default Form;
