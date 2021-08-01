import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Slide from "@material-ui/core/Slide";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { green } from "@material-ui/core/colors";
import { setModalAction } from "../../redux/modalDuck";
import ErrorIcon from '@material-ui/icons/Error';;

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2)
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500]
    }
});

const DialogTitle = withStyles(styles)(props => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        padding: theme.spacing(2)
    }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(1)
    }
}))(MuiDialogActions);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AppModal() {
    const [open, setOpen] = React.useState(false);

    const [msg, setMsg] = React.useState('');

    const dispatch = useDispatch();
    var stateModal = useSelector(store => store.modal.modal);

    useEffect(() => {

        //console.log('setModal', setModal, '<----> open ', open);

        if (stateModal.flag !== open) {

            //console.log('modal ingreso');
            setMsg(stateModal.msg)
            setOpen(stateModal.flag);

        }

    });

    const history = useHistory();

  
    const handleClose = () => {
        dispatch(setModalAction(false, ''));        

        if (stateModal.push)
            history.push(stateModal.push);
    };

    return (
        <div>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                TransitionComponent={Transition}
            >
                <DialogTitle
                    id="customized-dialog-title"
                    style={{ alignSelf: "center" }}
                >
                    {stateModal.error?
                        <ErrorIcon color="secondary" style={{fontSize: 150 }} />
                        : 
                        <CheckCircleOutlineIcon style={{ color: green[500], fontSize: 150 }} />
                    }
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        {msg}
                    </Typography>                   
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cerrar
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
