import React, { useEffect } from 'react';
import {
  Form,
  Container,
  Row,
  Col,
  FormControl,
  FormGroup,
  FormLabel,
  InputGroup,
  Button
} from "react-bootstrap";
import {useForm, Controller} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-regular-svg-icons";
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const MyForm: React.FC = () => {

  const schema = yup.object().shape({
    datePicker: yup.date().required(),
  });

  const {register, handleSubmit, errors, control, setError, clearErrors, getValues, setValue, reset, formState} = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: any) => {
    alert('submit');
  }

  useEffect(() => {
    register("ReactDatePicker");
  }, [register])

  const CustomInput = ({name, value, onClick, isInvalid, onBlur}: any) => (
    <InputGroup>
      <FormControl
        type="text"
        name={name}
        isInvalid={isInvalid}
        onClick={onClick}
        onBlur={onBlur}
        value={value}
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          onClick={onClick}
          style={{zIndex: 0, background: "white"}}
        >
          <FontAwesomeIcon
            icon={faCalendarAlt}
          />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  )

  return (
    <Form inline onSubmit={handleSubmit(onSubmit)}>
      <Container fluid>
        <Row className="pb-3">
          <Col sm={2}>
            <FormLabel>react-datepicker</FormLabel>
          </Col>
          <Col>
            <FormGroup>
              <Controller
                name={'datePicker'}
                control={control}
                isInvalid={errors.datePicker}
                render={({onChange, onBlur, value}) => (
                  <ReactDatePicker
                    locale="ja"
                    dateFormat="P"
                    name={'datePicker'}
                    onChange={onChange}
                    onBlur={onBlur}
                    selected={value}
                    customInput={<CustomInput/>}
                  />
                )}
              />
              {(errors?.datePicker) &&
              <FormControl.Feedback type="invalid" className={'d-block'}>
                  {errors?.datePicker?.message}
              </FormControl.Feedback>
              }
            </FormGroup>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button
              type={'submit'}
              variant="primary"
            >submit</Button>
          </Col>
        </Row>

      </Container>
    </Form>
  )
}

function App() {
  return (
    <div className="App">
      <MyForm/>
    </div>
  );
}

export default App;
