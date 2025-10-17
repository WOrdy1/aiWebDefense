declare module 'lottie-react-native' {
  import { Component } from 'react';
  import { StyleProp, ViewStyle } from 'react-native';

  interface LottieViewProps {
    source: any;
    autoPlay?: boolean;
    loop?: boolean;
    speed?: number;
    resizeMode?: 'cover' | 'contain' | 'center';
    style?: StyleProp<ViewStyle>;
  }

  export default class LottieView extends Component<LottieViewProps> {}
}
