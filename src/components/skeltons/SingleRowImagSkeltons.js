import React from "react";
import { View,Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import constants from '../../constants'
 
const SingleRowImagSkeltons = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={constants.vw(100)} height={constants.vw(100)} borderRadius={constants.vw(4)} />
          <SkeletonPlaceholder.Item marginTop={constants.vw(6)} width={constants.vw(100)} height={constants.vw(20)} borderRadius={constants.vw(4)} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};


export default SingleRowImagSkeltons;