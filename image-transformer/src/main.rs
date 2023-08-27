use aws_lambda_events::event::s3::S3Event;use lambda_runtime::{run, service_fn, Error, LambdaEvent};


/// This is the main body for the function.
/// Write your code inside it.
/// There are some code example in the following URLs:
/// - https://github.com/awslabs/aws-lambda-rust-runtime/tree/main/examples
/// - https://github.com/aws-samples/serverless-rust-demo/
async fn function_handler(event: LambdaEvent<S3Event>) -> Result<(), Error> {
    // Extract some useful information from the request
    tracing::info!("Rust function invoked");
    let payload = event.payload;
    let bucket = &payload.records[0].s3.bucket;
    let bucket_name = bucket.name.clone().unwrap_or(String::from("hello"));
    // tracing::info!({ %first_name }, "Rust function responds to event");
    tracing::info!({ %bucket_name }, "Rust function responds to event from bucket: ");
    // Ok(json!({ "message": format!("Hello, {first_name}!") }))
    Ok(())
}

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing_subscriber::fmt()
        .with_max_level(tracing::Level::INFO)
        // disable printing the name of the module in every log line.
        .with_target(false)
        // disabling time is handy because CloudWatch will add the ingestion time.
        .without_time()
        .init();

    run(service_fn(function_handler)).await
}
