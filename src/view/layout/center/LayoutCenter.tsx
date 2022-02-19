import { PropTypes } from "mobx-react";
import { Link } from "react-navi";
import { Button, Form, Grid, Message, Segment } from "semantic-ui-react";
import styles from "./LayoutCenter.module.less";

interface PropsType {
  children: any;
  maxWidth: string;
}

const LayoutCenter: React.FC<PropsType> = (props) => {
  return (
    <Grid
      textAlign="center"
      verticalAlign="middle"
      className={styles.container}
    >
      <Grid.Column style={{ maxWidth: props.maxWidth }}>
        {props.children}
      </Grid.Column>
    </Grid>
  );
};

export default LayoutCenter;
