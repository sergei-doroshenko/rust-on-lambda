import {
  aws_lambda as lambda,
  aws_s3 as s3,
  aws_lambda_event_sources as lambdaEvents,
  Stack,
  StackProps, RemovalPolicy, Duration
} from 'aws-cdk-lib';
import { Construct } from 'constructs';


export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const inputBucket = new s3.Bucket(this, `ImageTransformerInputBucket`, {
      bucketName: `image-transformer-input`,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true
    });

    const lambdaFunction = new lambda.Function(this, "ImageTransformerLambda", {
      functionName: "ImageTransformerLambda",
      runtime: lambda.Runtime.PROVIDED_AL2,
      architecture: lambda.Architecture.ARM_64,
      memorySize: 1024,
      timeout: Duration.seconds(30),
      handler: "bootstrap",
      code: lambda.Code.fromAsset("/Users/sddorosh/Documents/Personal/projects/rust-on-lambda/image-transformer/target/lambda/image-transformer")
    });

    inputBucket.grantRead(lambdaFunction);

    lambdaFunction.addEventSource(new lambdaEvents.S3EventSource(inputBucket, {
      events: [s3.EventType.OBJECT_CREATED]
    }))
  }
}
