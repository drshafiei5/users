import React, { useMemo, useCallback } from "react"
import type { CSSProperties, ReactNode } from "react"
import { useBottomScrollListener } from "react-bottom-scroll-listener"
import { Grid2 as Grid, useTheme, Box } from "@mui/material"
import CircularProgress from "@mui/material/CircularProgress"
import EmptyState from "./EmptyState"

interface ListViewProps<T> {
  border?: boolean
  renderRow: (item: T, index: number) => ReactNode
  isLoading?: boolean
  isError?: boolean
  delay?: number
  duration?: number
  containerStyle?: CSSProperties
  ListEmptyComponent?: React.ComponentType | null
  ListFooterComponent?: React.ComponentType | null
  ListErrorComponent?: React.ComponentType | null
  data: T[] | undefined
  onEndReached?: () => void
}

const ListView = <T,>({
  renderRow,
  onEndReached,
  data = [],
  isLoading = false,
  isError = false,
  containerStyle,
  border = false,
  ListFooterComponent,
  ListEmptyComponent,
  ListErrorComponent,
  ...rest
}: ListViewProps<T>) => {
  const theme = useTheme()

  // Memoized border styles for the container
  const borderStyle: CSSProperties = useMemo(
    () => ({
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      overflow: "hidden",
    }),
    [theme.palette.divider, theme.palette.background.paper],
  )

  // Handle reaching the end of the list
  const handleEndReached = useCallback(() => {
    if (onEndReached) {
      onEndReached()
    }
  }, [onEndReached])

  // Determine the style of the container
  const style = useMemo(
    () => (border ? { ...containerStyle, ...borderStyle } : containerStyle),
    [border, borderStyle, containerStyle],
  )

  // Attach scroll listener to handle end reached event
  useBottomScrollListener(handleEndReached, { debounce: 200 })

  // Render loading state
  const renderLoading = useMemo(
    () => (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        position="fixed"
        top={0}
        left={0}
        zIndex={1000}
      >
        <CircularProgress />
      </Box>
    ),
    [],
  )

  // Render empty state
  const renderEmptyState = useMemo(
    () => (ListEmptyComponent ? <ListEmptyComponent /> : <EmptyState />),
    [ListEmptyComponent],
  )

  // Render error state
  const renderErrorState = useMemo(
    () =>
      ListErrorComponent ? (
        <ListErrorComponent />
      ) : (
        <Box textAlign="center" color="error.main">
          An error occurred.
        </Box>
      ),
    [ListErrorComponent],
  )

  // Render rows based on data
  const renderedRows = useMemo(
    () => data.map((item, index) => renderRow(item, index)),
    [data, renderRow],
  )

  return (
    <Grid container spacing={2} style={style} {...rest}>
      {isLoading
        ? renderLoading
        : isError
          ? renderErrorState
          : data.length > 0
            ? renderedRows
            : renderEmptyState}
      {ListFooterComponent && (
        <div>
          <ListFooterComponent />
        </div>
      )}
    </Grid>
  )
}

export default React.memo(ListView) as typeof ListView
