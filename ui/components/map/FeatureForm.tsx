import Modal from 'react-modal';

Modal.setAppElement('#root');

interface FeatureFormProps{
    isOpen: boolean,
    setName: (name: string) => void
    submitForm: (e: { preventDefault: () => void; }) => void
}
const FeatureForm = ({isOpen, setName, submitForm}: FeatureFormProps) => {

    const handleNameChange = (e: { target: { value: string; }; }) => {
        setName(e.target.value);
    };

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Add Name"
        >
            <h2>Enter A Name</h2>
            <form onSubmit={submitForm}>
                <label>
                    Name:
                    <input type="text" onChange={handleNameChange}/>
                </label>
                <button type="submit">Submit</button>
            </form>
        </Modal>
    );
};

export default FeatureForm;
