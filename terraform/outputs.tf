output "lambda_arn" {
  value = length(aws_lambda_function.my_lambda_function) > 0 ? aws_lambda_function.my_lambda_function[0].arn : ""
}

output "bucket_name" {
  value = aws_s3_bucket.lambda_code_bucket.bucket
}

output "lambda_function_name" {
  value = length(aws_lambda_function.my_lambda_function) > 0 ? aws_lambda_function.my_lambda_function[0].function_name : ""
}
