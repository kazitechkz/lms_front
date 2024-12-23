import type {Either} from "@/core/domain/Either.ts";
import type {DataError} from "@/core/domain/DataError.ts";

export async function handleRequest<T>(
    request: () => Promise<Either<DataError, T>>,
    setLoading: (isLoading: boolean) => void,
    setError: (error: string | null) => void,
    onSuccess: (result: T) => void,
    handleErrors: (error: DataError) => string
): Promise<void> {
    setLoading(true);
    setError(null);

    const failureOrSuccess = await request();
    failureOrSuccess.fold(
        (error) => {
            setError(handleErrors(error));
            setLoading(false);
        },
        (result) => {
            onSuccess(result);
            setLoading(false);
        }
    );
}