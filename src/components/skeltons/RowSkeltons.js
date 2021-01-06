import React from "react";
import { View,Text } from "react-native";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import constants from '../../constants'
 
export const SingleRowSkeltons = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item marginLeft={20}>
          <SkeletonPlaceholder.Item width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item marginTop={6} width={120} height={20} borderRadius={4} />
          <SkeletonPlaceholder.Item marginTop={6} width={120} height={20} borderRadius={4} />
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export const NormalRow = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginLeft={0} width={constants.width*0.95} height={constants.height/10} borderRadius={4} marginTop={5} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export const CommunitySkelton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row">
        <SkeletonPlaceholder.Item width={constants.width/10} height={constants.width/10} borderRadius={constants.width/5} marginRight={constants.width/15} />
        <SkeletonPlaceholder.Item marginLeft={0} width={constants.width/1.5} height={constants.width/12} borderRadius={4} marginTop={2} />
      </SkeletonPlaceholder.Item>

      <SkeletonPlaceholder.Item marginTop={16} width={constants.width/1.2} height={constants.width/2} borderRadius={4} />
      <SkeletonPlaceholder.Item marginTop={16} width={constants.width/1.2} height={constants.width/15} borderRadius={4} />
    </SkeletonPlaceholder>
  );
};


export const  ProductBlockSkelton= () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item marginTop={16} width={constants.width*0.4} height={constants.width/2} borderRadius={4} />
        <SkeletonPlaceholder.Item marginTop={16} width={constants.width*0.4} height={constants.width/15} borderRadius={4} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export const FullRow = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row" >
        <SkeletonPlaceholder.Item  width={constants.width*0.89} height={constants.width/2} borderRadius={4} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export const GroupSkelton = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item flexDirection="row">
        <SkeletonPlaceholder.Item width={constants.width/8} height={constants.width/8} borderRadius={constants.width/5} marginRight={constants.width/15} />
        <SkeletonPlaceholder.Item marginLeft={0} width={constants.width/1.5} height={constants.width/12} borderRadius={4} marginTop={constants.width/45} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};