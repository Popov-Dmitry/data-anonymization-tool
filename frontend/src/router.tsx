import { Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import NotFound from "./routes/not-found/NotFound";
import Home from "./routes/home/Home";

export default function Router() {
  return (
    <BrowserRouter>
      {/*<Header />*/}
      <main className="max-w-1200px m-auto">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            {/*<Route path="/company/:slug" element={<Company />} />*/}
            {/*<Route*/}
            {/*  path={APP_ROUTES.RESERVATION}*/}
            {/*  element={*/}
            {/*    <RequireFinishSignUp user={user}>*/}
            {/*      <RequireCart selectedServicesNumber={cart.services.length}>*/}
            {/*        <Reservation />*/}
            {/*      </RequireCart>*/}
            {/*    </RequireFinishSignUp>*/}
            {/*  }*/}
            {/*/>*/}
            {/*{!user?.impersonate_name && (*/}
            {/*  <>*/}
            {/*    <Route*/}
            {/*      path={APP_ROUTES.HOME}*/}
            {/*      element={*/}
            {/*        <RequireFinishSignUp user={user}>*/}
            {/*          <Homepage />*/}
            {/*        </RequireFinishSignUp>*/}
            {/*      }*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={APP_ROUTES.SIGN_UP}*/}
            {/*      element={*/}
            {/*        <NoAuth user={user}>*/}
            {/*          <SignUp />*/}
            {/*        </NoAuth>*/}
            {/*      }*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={APP_ROUTES.VERIFY_USER}*/}
            {/*      element={*/}
            {/*        <RequireFinishSignUp user={user}>*/}
            {/*          <NoAuth user={user}>*/}
            {/*            <Verify />*/}
            {/*          </NoAuth>*/}
            {/*        </RequireFinishSignUp>*/}
            {/*      }*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={APP_ROUTES.LOGIN}*/}
            {/*      element={*/}
            {/*        <RequireFinishSignUp user={user}>*/}
            {/*          <NoAuth user={user}>*/}
            {/*            <Login />*/}
            {/*          </NoAuth>*/}
            {/*        </RequireFinishSignUp>*/}
            {/*      }*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={APP_ROUTES.RESET_PASSWORD}*/}
            {/*      element={*/}
            {/*        <RequireFinishSignUp user={user}>*/}
            {/*          <NoAuth user={user}>*/}
            {/*            <ResetPassword />*/}
            {/*          </NoAuth>*/}
            {/*        </RequireFinishSignUp>*/}
            {/*      }*/}
            {/*    />*/}
            {/*    <Route path="/artists/:id" element={<Artist />} />*/}
            {/*    <Route*/}
            {/*      path={APP_ROUTES.ME}*/}
            {/*      element={*/}
            {/*        <RequireFinishSignUp user={user} loading={loadingPage}>*/}
            {/*          <RequireAuth user={user} loading={loadingPage}>*/}
            {/*            <Me />*/}
            {/*          </RequireAuth>*/}
            {/*        </RequireFinishSignUp>*/}
            {/*      }*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path={APP_ROUTES.ACCOUNT_DETAILS}*/}
            {/*      element={*/}
            {/*        <RequireFinishSignUp user={user} loading={loadingPage}>*/}
            {/*          <AccountDetails />*/}
            {/*        </RequireFinishSignUp>*/}
            {/*      }*/}
            {/*    />*/}
            {/*    <Route*/}
            {/*      path="/me/booking/:id"*/}
            {/*      element={*/}
            {/*        <RequireFinishSignUp user={user} loading={loadingPage}>*/}
            {/*          <BookingDetails />*/}
            {/*        </RequireFinishSignUp>*/}
            {/*      }*/}
            {/*    />*/}
            {/*  </>*/}
            {/*)}*/}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
}
