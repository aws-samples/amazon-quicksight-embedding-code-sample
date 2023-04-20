import { View, Text,TextField, Image, Button, Heading, useTheme,useAuthenticator, RadioGroupField,Radio,Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import logo from '../img/octanklogo.png';

export const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Image
          alt="Oktank Logo"
          width="150px"
          height="150px"
          src= {logo}
        />
      </View>
    );
  },

  Footer() {
    const { tokens } = useTheme();

    return (
      <View textAlign="center" padding={tokens.space.large}>
        <Text color={tokens.colors.neutral[80]}>
          &copy; All Rights Reserved
        </Text>
      </View>
    );
  },

  SignIn: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Sign in to your account
        </Heading>
      );
    },
    Footer() {
      const { toResetPassword } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toResetPassword}
            size="small"
            variation="link"
          >
            Reset Password
          </Button>
        </View>
      );
    },
  },

  SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          User Onboarding
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();

      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
    FormFields() {
      return (
        <>
          <TextField
  label="Company"
  name="custom:company"
  placeholder="Enter your Company Name"
  isRequired={true}
/>

          <Authenticator.SignUp.FormFields/>
          <RadioGroupField
            label="Permissions"
            name="custom:role"
            direction="column"
            size="medium"
            defaultValue="Reader"
            >
            <Radio value="Reader">Reader</Radio>
            <Radio value="Author">Author</Radio>
          </RadioGroupField>

        </>
      );
    },
  },
  ConfirmSignUp: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      const { toSignIn } = useAuthenticator();
      return (
        <View textAlign="center">
          <Button
            fontWeight="normal"
            onClick={toSignIn}
            size="small"
            variation="link"
          >
            Back to Sign In
          </Button>
        </View>
      );
    },
  },
  SetupTOTP: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmSignIn: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
  ConfirmResetPassword: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    },
  },
};

export const formFields = {
  signIn: {
    username: {
      labelHidden: false,
      placeholder: 'Enter your email',
    },
  },
  signUp: {
    email: {
      labelHidden: false,
      label: 'User Information',
      placeholder: 'Email',
      isRequired: true,
      order: 2,
    },
    given_name: {
      labelHidden: true,
      placeholder: 'First Name',
      isRequired: true,
      order: 3,
    },
    family_name: {
      labelHidden: true,
      placeholder: 'Last Name',
      isRequired: true,
      order: 4,
    },
    password: {
      labelHidden: false,
      label: 'Password',
      placeholder: 'Enter your Password',
      isRequired: true,
      order: 5,
    },
    confirm_password: {
      labelHidden: true,
      label: 'Confirm Password',
      isRequired: true,
      order: 6,
    },
    // role: {
    //   labelHidden: false,
    //   type: "custom:role",
    //   label: 'Permissions:',
    //   value: 'admin',
    //   isRequired: true,
    //   isDisabled: true,
    // },
  },
  forceNewPassword: {
    password: {
      labelHidden: false,
      placeholder: 'Enter your Password',
    },
  },
  resetPassword: {
    username: {
      labelHidden: false,
      placeholder: 'Enter your email',
    },
  },
  confirmResetPassword: {
    confirmation_code: {
      labelHidden: false,
      placeholder: 'Enter your Confirmation Code',
      label: 'New Label',
      isRequired: false,
    },
    confirm_password: {
      labelHidden: false,
      placeholder: 'Enter your Password Please',
    },
  },
  setupTOTP: {
    QR: {
      totpIssuer: 'test issuer',
      totpUsername: 'amplify_qr_test_user',
    },
    confirmation_code: {
      labelHidden: false,
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code',
      isRequired: false,
    },
  },
  confirmSignIn: {
    confirmation_code: {
      labelHidden: false,
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code',
      isRequired: false,
    },
  },
};


;